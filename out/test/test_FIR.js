import { FIR } from 'tssv/lib/modules/FIR';
import { Module } from 'tssv/lib/core/TSSV';
import { writeFileSync, mkdirSync } from 'fs';
mkdirSync('sv-examples/FIR/myFIR3', { recursive: true });
const myFir3 = new FIR({
    name: 'myFIR3',
    numTaps: 13,
    coefficients: [-1n, 0n, 5n, -6n, -10n, 38n, 77n, 38n, -10n, -6n, 5n, 0n, -1n],
    inWidth: 8,
    outWidth: 8,
    rShift: 7
});
const myFir3Sv = myFir3.writeSystemVerilog();
try {
    writeFileSync('sv-examples/FIR/myFIR3/myFIR3.sv', myFir3Sv);
}
catch (err) {
    console.error(err);
}
if (!myFir3Sv.includes('output logic signed [31:0] COEFF_0')) {
    throw new Error('Default FIR coefficient register width should remain 32 bits');
}
const myFirCoeffWidth4 = new FIR({
    name: 'myFIRCoeffWidth4',
    numTaps: 3,
    coefficients: [-2n, 1n, 3n],
    coefficientsWidth: 4,
    inWidth: 8,
    outWidth: 8,
    rShift: 2
});
const myFirCoeffWidth4Sv = myFirCoeffWidth4.writeSystemVerilog();
if (!myFirCoeffWidth4Sv.includes('output logic signed [3:0] COEFF_0')) {
    throw new Error('FIR coefficient registers should use coefficientsWidth when provided');
}
const tbBody = `
    // always accept output
    assign m_axis.TREADY = 1'b1;
    // tie AXI clock/reset into the interface bundles
    assign s_axis.ACLK    = clk;
    assign s_axis.ARESETn = rst_b;
    assign m_axis.ACLK    = clk;
    assign m_axis.ARESETn = rst_b;

    always @(posedge clk or negedge rst_b)
      if(!rst_b)
        begin
          s_axis.TVALID <= 1'b0;
          s_axis.TDATA  <= '0;
          count <= 'd0;
          phase <= 'd0;
          step  <= 'd16;
        end
      else
        begin
          s_axis.TVALID <= 1'b1;
          count <= count + 1'b1;
          if((step > 'd1) && (count[7:0] == 7'd127))
            begin
              step <= step>>1;
            end
          phase <= phase + step;
          s_axis.TDATA <= (phase == 5'd16) ? -8'sd127 : ((phase == 5'd0) ? 8'sd127 : 8'sd0);
        end
`;
const tb_lpFIR = new Module({ name: 'tb_lpFIR' }, {
    clk: { direction: 'input', isClock: 'posedge' },
    rst_b: { direction: 'input', isReset: 'lowasync' }
}, {
    phase: { width: 5 },
    count: { width: 16 },
    step: { width: 5 }
}, tbBody);
tb_lpFIR.addSubmodule('dut', myFir3, {}, true, true);
try {
    const TB = `
/* verilator lint_off DECLFILENAME */
/* verilator lint_off UNUSED */
${tb_lpFIR.writeSystemVerilog()}
`;
    writeFileSync('sv-examples/FIR/myFIR3/tb_lpFIR.sv', TB);
}
catch (err) {
    console.error(err);
}
