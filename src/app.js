import Nav from "./nav.js";
import CanvasModel from "./canvas.js";

class App {
	init() {
		const nav = new Nav();
		nav.init();
		const canvas = new CanvasModel();
		canvas.init();
	}
}
const app = new App();
app.init();
