const axios = require("axios");

const { keyEvents } = require('./keyboardInput');

const setColor = async color => {
    axios.post(process.env.LIGHTING_URL + "/color", {
        color
    });
};

keyEvents.on("key", keyCode => {
    switch (keyCode) {
	// Scene Toggle
	case 458796: { // SPACE
	    axios.post(process.env.DEVICES_URL, {
		setScene: null
	    });
	    break;
	}

	// Lighting
        case 458841: { // NUM 0
            setColor(0);
            break;
        }
        case 458842: {
            setColor(40);
            break;
        }
        case 458843: {
            setColor(80);
            break;
        }
        case 458844: {
            setColor(120);
            break;
        }
        case 458845: {
            setColor(160);
            break;
        }
        case 458846: {
            setColor(200);
            break;
        }
        case 458847: {
            setColor(240);
            break;
        }
        case 458848: {
            setColor(280);
            break;
        }
        case 458849: {
            setColor(320);
            break;
        }
        case 458850: { // NUM 0
            axios.post(process.env.LIGHTING_URL + "/white", {
                cold: false
            });
            break;
        }
        case 458851: { // NUM .
            axios.post(process.env.LIGHTING_URL + "/white", {
                cold: true
            });
            break;
        }
        case 458837: { // NUM *
            axios.post(process.env.LIGHTING_URL + "/cycle", {
                cycle: true
            });
            break;
        }
        case 458836: { // NUM /
            axios.post(process.env.LIGHTING_URL + "/cycle", {
                cycle: false
            });
            break;
        }
        case 458840: { // NUM ENTER
            axios.post(process.env.LIGHTING_URL + "/power", {
                power: false
            });
            break;
        }
        case 458838: { // NUM -
            axios.post(process.env.LIGHTING_URL + "/brightness", {
                brightness: -25,
                adjust: true
            });
            break;
        }
        case 458839: { // NUM +
            axios.post(process.env.LIGHTING_URL + "/brightness", {
                brightness: 25,
                adjust: true
            });
            break;
        }
	default: {
	    console.log("RECEIVED UNIMPLEMENTED KEY " + keyCode)
	}
    }
});
