import { Interface } from 'tssv/lib/core/TSSV';
/**
 * TSSV Interface bundle for the AXI4 protocol
 */
export class AXI4 extends Interface {
    /**
     * Create a new AXI4 Interface bundle with either master or slave port interface
     * or just a bundle of interconnect wires
     * @param params param value set
     * @param role sets the role of this instance to choose master or slave port interface
     * or just a bundle of interconnect wires
     */
    constructor(params = {}, role = undefined) {
        super('AXI4', {
            AWID_WIDTH: params.AWID_WIDTH || 4,
            WID_WIDTH: params.WID_WIDTH || 4,
            BID_WIDTH: params.BID_WIDTH || 4,
            ARID_WIDTH: params.ARID_WIDTH || 4,
            RID_WIDTH: params.RID_WIDTH || 4,
            ADDR_WIDTH: params.ADDR_WIDTH || 32,
            DATA_WIDTH: params.DATA_WIDTH || 32,
            USER_WIDTH: params.USER_WIDTH || 0,
            QOS: params.QOS || 'false'
        }, role);
        this.signals = {
            ACLK: { width: 1 },
            ACLKEN: { width: 1 },
            ARESETn: { width: 1 },
            AWID: { width: params.AWID_WIDTH || 8 },
            AWADDR: { width: params.ADDR_WIDTH || 32 },
            AWLEN: { width: 8 },
            AWSIZE: { width: 3 },
            AWBURST: { width: 2 },
            AWLOCK: { width: 1 },
            AWCACHE: { width: 4 },
            AWPROT: { width: 3 },
            AWQOS: { width: 4 },
            AWREGION: { width: 4 },
            AWVALID: { width: 1 },
            AWREADY: { width: 1 },
            WDATA: { width: params.DATA_WIDTH || 32 },
            WSTRB: { width: (params.DATA_WIDTH) ? params.DATA_WIDTH >> 3 : 4 },
            WLAST: { width: 1 },
            WVALID: { width: 1 },
            WREADY: { width: 1 },
            BID: { width: params.BID_WIDTH || 8 },
            BRESP: { width: 2 },
            BVALID: { width: 1 },
            BREADY: { width: 1 },
            ARID: { width: params.ARID_WIDTH || 8 },
            ARADDR: { width: params.ADDR_WIDTH || 32 },
            ARLEN: { width: 8 },
            ARSIZE: { width: 3 },
            ARBURST: { width: 2 },
            ARLOCK: { width: 1 },
            ARCACHE: { width: 4 },
            ARPROT: { width: 3 },
            ARQOS: { width: 4 },
            ARREGION: { width: 4 },
            ARVALID: { width: 1 },
            ARREADY: { width: 1 },
            RID: { width: params.RID_WIDTH || 8 },
            RDATA: { width: params.DATA_WIDTH || 32 },
            RRESP: { width: 2 },
            RLAST: { width: 1 },
            RVALID: { width: 1 },
            RREADY: { width: 1 },
            AWUSER: { width: params.USER_WIDTH || 0 },
            WUSER: { width: params.USER_WIDTH || 0 },
            BUSER: { width: params.USER_WIDTH || 0 },
            ARUSER: { width: params.USER_WIDTH || 0 },
            RUSER: { width: params.USER_WIDTH || 0 }
        };
        // Add ARQOS and AWQOS if QOS is true
        if (params.QOS === 'true') {
            this.signals.ARQOS = { width: 4 };
            this.signals.AWQOS = { width: 4 };
        }
        this.modports = {
            outward: {
                ACLK: 'input',
                ACLKEN: 'input',
                ARESETn: 'input',
                AWID: 'output',
                AWADDR: 'output',
                AWLEN: 'output',
                AWSIZE: 'output',
                AWBURST: 'output',
                AWLOCK: 'output',
                AWCACHE: 'output',
                AWPROT: 'output',
                AWQOS: 'output',
                AWREGION: 'output',
                AWVALID: 'output',
                AWREADY: 'input',
                WDATA: 'output',
                WSTRB: 'output',
                WLAST: 'output',
                WVALID: 'output',
                WREADY: 'input',
                BID: 'input',
                BRESP: 'input',
                BVALID: 'input',
                BREADY: 'output',
                ARID: 'output',
                ARADDR: 'output',
                ARLEN: 'output',
                ARSIZE: 'output',
                ARBURST: 'output',
                ARLOCK: 'output',
                ARCACHE: 'output',
                ARPROT: 'output',
                ARQOS: 'output',
                ARREGION: 'output',
                ARVALID: 'output',
                ARREADY: 'input',
                RID: 'input',
                RDATA: 'input',
                RRESP: 'input',
                RLAST: 'input',
                RVALID: 'input',
                RREADY: 'output',
                AWUSER: 'output',
                WUSER: 'output',
                BUSER: 'input',
                ARUSER: 'output',
                RUSER: 'input'
            },
            inward: {
                ACLK: 'input',
                ACLKEN: 'input',
                ARESETn: 'input',
                AWID: 'input',
                AWADDR: 'input',
                AWLEN: 'input',
                AWSIZE: 'input',
                AWBURST: 'input',
                AWLOCK: 'input',
                AWCACHE: 'input',
                AWPROT: 'input',
                AWQOS: 'input',
                AWREGION: 'input',
                AWVALID: 'input',
                AWREADY: 'output',
                WDATA: 'input',
                WSTRB: 'input',
                WLAST: 'input',
                WVALID: 'input',
                WREADY: 'output',
                BID: 'output',
                BRESP: 'output',
                BVALID: 'output',
                BREADY: 'input',
                ARID: 'input',
                ARADDR: 'input',
                ARLEN: 'input',
                ARSIZE: 'input',
                ARBURST: 'input',
                ARLOCK: 'input',
                ARCACHE: 'input',
                ARPROT: 'input',
                ARQOS: 'input',
                ARREGION: 'input',
                ARVALID: 'input',
                ARREADY: 'output',
                RID: 'output',
                RDATA: 'output',
                RRESP: 'output',
                RLAST: 'output',
                RVALID: 'output',
                RREADY: 'input',
                AWUSER: 'input',
                WUSER: 'input',
                BUSER: 'output',
                ARUSER: 'input',
                RUSER: 'output'
            }
        };
        // Add modports for QOS signals if QOS is true
        if (params.QOS === 'true') {
            this.modports.outward.ARQOS = 'output'; // input
            this.modports.outward.AWQOS = 'output'; // input
            this.modports.inward.ARQOS = 'input'; // output
            this.modports.inward.AWQOS = 'input'; // output
        }
    }
}
/**
 * VLNV Metadata
 */
AXI4.VLNV = {
    vendor: 'amba.com',
    library: 'AMBA4',
    name: 'AXI4',
    version: 'r0p0_0'
};
