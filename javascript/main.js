// Jonas und Tim
import * as THREE from "../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.js";

// radius: Größe des Planeten
// position: Position im Raum
// textureFile: Bild welches auf der Kugel dargestellt wird
function erzeugePlanet(radius, position, textureFile, name) {
    const geometry = new THREE.SphereGeometry(radius);
    const texture = new THREE.TextureLoader().load(textureFile);
    const material = new THREE.MeshBasicMaterial({map: texture});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.name = name;
    return mesh;
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


let camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 1, 10000);
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
const sonneMesh = erzeugePlanet(10, new THREE.Vector3(0, 0, 0), "../img/sun.jpeg", "sonne");
const merkurMesh = erzeugePlanet(1, new THREE.Vector3(20, 0, 0), "../img/mercury.png", "merkur");
const venusMesh = erzeugePlanet(2, new THREE.Vector3(36, 0, 0), "../img/venus.jpeg", "venus");
const erdeMesh = erzeugePlanet(2.5, new THREE.Vector3(50, 0, 0), "../img/earth.jpeg", "erde");
const marsMesh = erzeugePlanet(1.25, new THREE.Vector3(76.5, 0, 0), "../img/mars.jpeg", "mars");
const jupiterMesh = erzeugePlanet(8, new THREE.Vector3(259.5, 0, 0), "../img/jupiter.png", "jupiter");
const saturnMesh = erzeugePlanet(7, new THREE.Vector3(479, 0, 0), "../img/saturn.png", "saturn");
const uranusMesh = erzeugePlanet(5.5, new THREE.Vector3(960, 0, 0), "../img/uranus.png", "uranus");
const neptunMesh = erzeugePlanet(5, new THREE.Vector3(1505, 0, 0), "../img/neptune.png", "neptun");

scene.add(sonneMesh, merkurMesh, venusMesh, erdeMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptunMesh);

// Jonny
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

        document.getElementById("steckbrief-" + sonneMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + merkurMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + venusMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + erdeMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + marsMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + jupiterMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + saturnMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + uranusMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + neptunMesh.name).style.display = "none";
        document.getElementById("steckbrief-" + intersects[0].object.name).style.display = "block";
    }
};

// Jonas
function berechneSonnenRotation(t, mesh) {
    mesh.rotation.set(0, 202*t, 0);
}

function berechneMerkurPositionUndRotation(t, mesh) {
    let r1 = 20;
    let v1 = 47.9;
    let x1 = r1*Math.cos(v1*t);
    let z1 = r1*Math.sin(v1*t);
    mesh.position.set(x1, 0, z1);
    mesh.rotation.set(0, 0.3*t, 0);
}

function berechneVenusPositionUndRotation(t, mesh) {
    let r2 = 36;
    let v2 = 35;
    let x2 = r2*Math.cos(v2*t);
    let z2 = r2*Math.sin(v2*t);
    mesh.position.set(x2, 0, z2);
    mesh.rotation.set(0, 0.2*t, 0);
}

function berechneErdPositionUndRotation(t, mesh) {
    let r3 = 50;
    let v3 = 29.8;
    let x3 = r3*Math.cos(v3*t);
    let z3 = r3*Math.sin(v3*t);
    mesh.position.set(x3, 0, z3);
    mesh.rotation.set(0, 47*t, 0);
}

function berechneMarsPositionUndRotation(t, mesh) {
    let r4 = 76.5;
    let v4 = 24.1;
    let x4 = r4*Math.cos(v4*t);
    let z4 = r4*Math.sin(v4*t);
    mesh.position.set(x4, 0, z4);
    mesh.rotation.set(0, 24*t, 0);
}

function berechneJupiterPositionUndRotation(t, mesh) {
    let r5 = 259.5;
    let v5 = 13.1;
    let x5 = r5*Math.cos(v5*t);
    let z5 = r5*Math.sin(v5*t);
    mesh.position.set(x5, 0, z5);
    mesh.rotation.set(0, 1258*t, 0);
}

function berechneSaturnPositionUndRotation(t, mesh) {
    let r6 = 479;
    let v6 = 9.6;
    let x6 = r6*Math.cos(v6*t);
    let z6 = r6*Math.sin(v6*t);
    mesh.position.set(x6, 0, z6);
    mesh.rotation.set(0, 988*t, 0);
}

function berechneUranusPositionUndRotation(t, mesh) {
    let r7 = 960;
    let v7 = 6.8;
    let x7 = r7*Math.cos(v7*t);
    let z7 = r7*Math.sin(v7*t);
    mesh.position.set(x7, 0, z7);
    mesh.rotation.set(0, 259*t, 0);
}

function berechneNeptunPositionUndRotation(t, mesh) {
    let r8 = 1505;
    let v8 = 5.4;
    let x8 = r8*Math.cos(v8*t);
    let z8 = r8*Math.sin(v8*t);
    mesh.position.set(x8, 0, z8);
    mesh.rotation.set(0, 268*t, 0);
}

let t = 0;
const animate = () => {
    t += 1/3600;
    berechneSonnenRotation(t, sonneMesh);
    berechneMerkurPositionUndRotation(t, merkurMesh);
    berechneVenusPositionUndRotation(t, venusMesh);
    berechneErdPositionUndRotation(t, erdeMesh);
    berechneMarsPositionUndRotation(t, marsMesh);
    berechneJupiterPositionUndRotation(t, jupiterMesh);
    berechneSaturnPositionUndRotation(t, saturnMesh);
    berechneUranusPositionUndRotation(t, uranusMesh);
    berechneNeptunPositionUndRotation(t, neptunMesh);

    // In jedem Frame die Animation neu rendern
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();