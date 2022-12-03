import * as THREE from "../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.js";

// radius: Größe des Planeten
// position: Position im Raum
// textureFile: Bild welches auf der Kugel dargestellt wird
function erzeugePlanet(radius, position, textureFile) {
    const geometry = new THREE.SphereGeometry(radius);
    const texture = new THREE.TextureLoader().load(textureFile);
    const material = new THREE.MeshBasicMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    return mesh;
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


let camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 128;

let scene = new THREE.Scene();

// Skybox laden
const loader = new THREE.CubeTextureLoader();
scene.background = loader.load([
    '../img/purplenebula_bk.png',
    '../img/purplenebula_dn.png',
    '../img/purplenebula_ft.png',
    '../img/purplenebula_lf.png',
    '../img/purplenebula_up.png',
    '../img/purplenebula_rt.png',
]);

// 3D renderer auf HTML-Seite darstellen
let renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("ThreeJsCanvas"),
    antialias: true,
});
// Größe im Browser
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Mittels Maus Perspektive steuern
let controls = new OrbitControls(camera, renderer.domElement);

// Wenn die Größe des Browser-Fensters geändert wird, soll die Größe der Animation ebenfalls geändert werden
window.addEventListener("resize", () => onWindowResize(camera, renderer), false);

// Alle Objekte der Animation hinzufügen:
const sunMesh = erzeugePlanet(8, new THREE.Vector3(0, 0, 0), "../img/sun.jpeg");
const mercuryMesh = erzeugePlanet(2,  new THREE.Vector3(16, 0, 0), "../img/mercury.png");
const venusMesh = erzeugePlanet(3, new THREE.Vector3(32, 0, 0), "../img/venus.jpeg");
const earthMesh = erzeugePlanet(4, new THREE.Vector3(48, 0, 0), "../img/earth.jpeg");
const marsMesh = erzeugePlanet(3, new THREE.Vector3(64, 0, 0), "../img/mars.jpeg");
const jupiterMesh = erzeugePlanet(7, new THREE.Vector3(80,0,0),"../img/jupiter.png");
const saturnMesh = erzeugePlanet(6, new THREE.Vector3(96,0,0), "../img/saturn.png");
const uranusMesh = erzeugePlanet(5, new THREE.Vector3(112,0,0), "../img/uranus.png");
const neptuneMesh = erzeugePlanet(5, new THREE.Vector3(128,0,0), "../img/neptune.png");

scene.add(sunMesh, mercuryMesh, venusMesh, earthMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptuneMesh);

let raycaster = new THREE.Raycaster();
document.body.onmousedown = function (event) {
    let mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        // intersects[0].object ist das Objekt, auf welches gerade geklickt wurde

        // Setze Position des OrbitControllers auf Position des Objektes
        controls.target = intersects[0].object.position;
        controls.update();

        // ToDo: Steckbrief auf Seite anzeigen
        // document.getElementById("Steckbrief")...
    }
};

function berechneSonnenRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneMerkurPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneVenusPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneErdPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneMarsPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneJupiterPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneSaturnPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneUranusPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

function berechneNeptunPositionUndRotation(t, mesh) {
    mesh.position.set(t, t, t);
    mesh.rotation.set(t, t, t);
}

let t = 0;
// Wie schnell sich die Planeten um die Sonne bewegen sollen
let speed = 1 / 60;
const animate = () => {
    t += speed;
    berechneSonnenRotation(t, sunMesh);
    berechneMerkurPositionUndRotation(t, mercuryMesh);
    berechneVenusPositionUndRotation(t, venusMesh);
    berechneErdPositionUndRotation(t, earthMesh);
    berechneMarsPositionUndRotation(t, marsMesh);
    berechneJupiterPositionUndRotation(t, jupiterMesh);
    berechneSaturnPositionUndRotation(t, saturnMesh);
    berechneUranusPositionUndRotation(t, uranusMesh);
    berechneNeptunPositionUndRotation(t, neptuneMesh);

    // In jedem Frame die Animation neu rendern
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();