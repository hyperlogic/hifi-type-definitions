declare namespace Script {
    function include(filename: string, callback?: Function): void;
    var update: Signal;
    var scriptEnding: Signal;
}

declare namespace Tablet {
    function getTablet(name: string): TabletProxy;
}

declare class TabletProxy {
    addButton(properties: object): TabletButtonProxy;
    removeButton(button: TabletButtonProxy);
    gotoWebScreen(url: string, injectedJavaScriptUrl?: string, loadOtherBase?: boolean): void;
    gotoHomeScreen(): void;
    emitScriptEvent(msg: any): void;
    screenChanged: Signal;
    webEventReceived: Signal;
}

declare class Signal {
    connect(callback: Function): void;
    disconnect(callback: Function): void;
}

declare class TabletButtonProxy {
    editProperties(properties: object): void;
    clicked: Signal;
}

interface StandardDevices {
    LeftHand: number;
    RightHand: number;
    LTClick: number;
    RTClick: number;
}

declare namespace Controller {
    function triggerHapticPulse(strength: number, duration: number, hand: number): void;
    function newMapping(mappingName: string): MappingObject;
    function getPoseValue(device: number): ControllerPose;
    var Standard: StandardDevices;
}

declare class ControllerPose {
    
}

declare class MappingObject {
    from(action: number): MappingObject;
    peek(): MappingObject;
    to(callback: Function): MappingObject;
    enable(): void;
    disable(): void;
}

interface vec2 {
    x: number;
    y: number;
}

interface vec3 {
    x: number;
    y: number;
    z: number;
}

interface quat {
    x: number;
    y: number;
    z: number;
    w: number;  
}

interface mat4 {
    r0c0: number;
    r1c0: number;
    r2c0: number;
    r3c0: number;
    r0c1: number;
    r1c1: number;
    r2c1: number;
    r3c1: number;
    r0c2: number;
    r1c2: number;
    r2c2: number;
    r3c2: number;
    r0c3: number;
    r1c3: number;
    r2c3: number;
    r3c3: number;
}

declare namespace Vec3 {
    function cross(v1: vec3, v2: vec3): vec3;
    function distance(a: vec3, b: vec3): number;
    function dot(v1: vec3, v2: vec3): number;
    function equal(v1: vec3, v2: vec3): boolean;
    function fromPolar(polar: vec3): Vec3;
    function fromPolar(elevation: number, azimuth: number): vec3;
    function getAngle(v1: vec3, v2: vec3): number;
    function length(v: vec3): number;
    function mix(v1: vec3, v2: vec3, factor: number): vec3;
    function multiply(a: vec3, b: number): vec3;
    function multiply(a: number, b: vec3): vec3;
    function multiplyQbyV(q: quat, v: vec3): vec3;
    function multiplyVbyV(v1: vec3, v2: vec3): vec3;
    function normalize(v: vec3): vec3;
    function orientedAngle(v1: vec3, v2: vec3, ref: vec3): number;
    function print(label: string, v: vec3);
    function reflect(v: vec3, normal: vec3): vec3;
    function subtract(a: vec3, b: vec3): vec3;
    function sum(a: vec3, b: vec3): vec3;
    function toPolar(v: vec3): vec3;
    function withinEpsilon(v1: vec3, v2: vec3, epsilon: number): boolean;
}

declare namespace Quat {
    function angle(q: quat): number;
    function angleAxis(angle: number, axis: vec3): quat;
    function axis(q: quat): vec3;
    function cancelOutRoll(q: quat): quat;
    function cancelOutRollAndPitch(q: quat): quat;
    function conjugate(q: quat): quat;
    function dot(q1: quat, q2: quat): number;
    function equal(q1: quat, q2: quat): boolean;
    function fromPitchYawRollDegrees(pitch: number, yaw: number, roll: number): quat;
    function fromPitchYawRollRadians(pitch: number, yaw: number, roll: number): quat;
    function fromVec3Degrees(v: vec3): quat;
    function fromVec3Radians(v: vec3): quat;
    function getForward(q: quat): vec3;
    function getFront(q: quat): vec3;
    function getRight(q: quat): vec3;
    function getUp(q: quat): vec3;
    function inverse(q: quat): quat;
    function lookAt(eye: vec3, target: vec3, up: vec3): quat;
    function lookAtSimple(eye: vec3, target: vec3): quat;
    function mix(q1: quat, q2: quat, alpha: number): quat;
    function mix(a: quat, b: quat, alpha: number): quat;
    function multiply(q1: quat, a1: quat): quat;
    function normalize(q: quat): quat;
    function print(label: string, q: quat, asDegrees?: boolean);
    function rotationBetween(v1: vec3, v2: vec3): quat;
    function safeEulerAngles(q: quat): Vec3;
    function slerp(q1: quat, q2: quat, alpha: number): quat;
    function squad(q1: quat, q2: quat, s1: quat, s2: quat, alpha: number): quat;
}

declare namespace Mat4 {
    function extractRotation(m: mat4): quat;
    function extractTranslation(m: mat4): vec3;
}

declare class AudioResource {
    downloaded: boolean;
}

declare namespace SoundCache {
    function getSound(url: string): AudioResource;
}

declare namespace Audio {
    function playSound(sound: object, params?: object): AudioInjector;
}

interface InjectorOptions {
    position?: vec3;
    volume?: number;
    loop?: boolean;
    orientation?: quat;
    ignorePenumbra?: boolean;
    localOnly?: boolean;
    secondOffset?: boolean;
    pitch?: boolean;    
}

declare class AudioInjector {
    finished: Signal;
    setOptions(options: InjectorOptions): void;
    restart(): void;
}

declare var print: (msg: string) => void;

declare class Xform {
    constructor(rot: quat, pos: vec3);
    static mul(lhs: Xform, rhs: Xform): Xform;
    inv(): Xform;
    xformPoint(point: vec3): vec3;
    rot: quat;
    pos: vec3;
}

declare namespace AvatarManager {
    function getAvatar(avatarID: string): AvatarData;
    function getAvatarsInRange(position: vec3, radius: number): string[];
}

declare class AvatarData {
    readonly SELF_ID: string;
    readonly sessionUUID: string;
    position: vec3;
    orientation: quat;
    controllerLeftHandMatrix: mat4;
    controllerRightHandMatrix: mat4;
    clearPinOnJoint(index: number): void;
    pinJoint(index: number, pos: vec3, rot: quat): void;
    getJointIndex(jointName: string): number;
    getAbsoluteJointRotationInObjectFrame(index: number): quat;
    getAbsoluteJointTranslationInObjectFrame(index: number): vec3;
    getLeftPalmPosition(): vec3;
    getLeftPalmRotation(): quat;
    getRightPalmPosition(): vec3;
    getRightPalmRotation(): quat;
    addAnimationStateHandler(callback: (obj: AnimVars) => AnimVars, keys: string[]): Function;
    removeAnimationStateHandler(id: Function): void;
}

declare namespace Messages {
    function sendMessage(channel: string, message: string, localOnly?: boolean): void;
    function subscribe(channel: string): void;
    var messageReceived: Signal;
}

declare namespace HMD {
    function requestHideHandControllers(): void;
    function requestShowHandControllers(): void;
}

declare var MyAvatar: AvatarData;

declare interface AnimVars {
    rightHandType?: number;
    leftHandType?: number;
    rightHandRotation?: quat;
    rightHandPosition?: vec3;
    leftHandRotation?: quat;
    leftHandPosition?: vec3;
}

declare interface BoundingBox {
    brn: vec3;
    tfl: vec3;
    center: vec3;
    dimensions: vec3;
}

declare interface AACube {
    x: number;
    y: number;
    z: number;
    scale: number;
}

declare interface RenderInfo {
    verticesCount: number;
    texturesCount: number;
    textureSize: number;
    hasTransparent: boolean;
    drawCalls: number;
}

declare interface GrabProperties {
    grabbable?: boolean;
    grabKinematic?: boolean;
    grabFollowsController?: boolean;
    triggerable?: boolean;
    equippable?: boolean;
    equippableLeftPositon?: vec3;
    equippableLeftRotation?: quat;
    equippableRightPosition?: vec3;
    equippableRightRotation?: vec3;
    equippableIndicatorURL?: string;
    equippableIndicatorScale?: vec3;
    equippableIndicatorOffset?: vec3;
}

declare interface Color {
    red: number;
    green: number;
    blue: number;
}

declare interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

declare interface EntityAnimationProperties {
    url?: string;
    fps?: number;
    firstFrame?: number;
    lastFrame?: number;
    currentFrame?: number;
    running?: boolean;
    loop?: boolean;
    hold?: boolean;
}

declare interface KeyLightProperties {
    color?: Color;
    intensity?: number;
    direciton?: vec3;
    castShadows?: boolean;
}

declare interface AmbientLightProperties {
    ambientIntensity?: number;
    ambientURL?: string;
}

declare interface SkyboxProperties {
    color?: Color;
    url?: string;
}

declare interface HazeProperties {
    hazeRange?: number;
    hazeColor?: Color;
    hazeEnableGlare?: boolean;
    hazeGlareColor?: Color;
    hazeGlareAngle?: number;
    hazeAltitudeEffect?: boolean;
    hazeBaseRef?: number;
    hazeCeiling?: number;
    hazeBackgroundBlend?: number;
    hazeAttenuateKeyLight?: boolean;
    hazeKeyLightRange?: number;
    hazeKeyLightAltitude?: number;
}

declare interface Bloom {
    bloomIntensity?: number;
    bloomThreshold?: number;
    bloomSize?: number;
}

declare interface EntityProperties {
    id?: string;
    name?: string;
    type?: "Box" | "Sphere" | "Shape" | "Model" | "Text" | "Image" | "Web" | "ParticleEffect" | "Line" | "PolyLine" | "PolyVox" | "Grid" | "Light" | "Zone" | "Material";
    entityHostType?: "domain" | "avatar" | "local";
    avatarEntity?: boolean;
    localEntity?: boolean;
    owningAvatarID?: string;
    created?: string;
    age?: number;
    ageAsText?: string;
    lifetime?: number;
    lastEdited?: number;
    lastEditedBy?: string;
    locked?: boolean;
    visible?: boolean;
    canCastShadow?: boolean;
    isVisibleInSecondaryCamera?: boolean;
    position?: vec3;
    rotation?: quat;
    dimensions?: vec3;
    registrationPoint?: vec3;
    naturalPosition?: vec3;
    naturalDimensions?: vec3;
    velocity?: vec3;
    damping?: number;
    angularVelocity?: vec3;
    angularDamping?: number;
    gravity?: vec3;
    acceleration?: vec3;
    restitution?: number;
    friction?: number;
    density?: number;
    collisionless?: boolean;
    ignoreForCollisions?: boolean;
    collisionMask?: number;
    collidesWith?: string;
    collisionSoundURL?: string;
    dynamic?: boolean;
    collisionsWillMove?: boolean;
    href?: string;
    description?: string;
    userData?: string;
    script?: string;
    scriptTimestamp?: number;
    serverScripts?: string;
    parentID?: string;
    parentJointIndex?: number;
    localPosition?: vec3;
    localRotation?: quat;
    localVelocity?: vec3;
    localAngularVelocity?: vec3;
    localDimensions?: vec3;
    boundingBox?: BoundingBox;
    queryAACube?: AACube;
    actionData?: string;
    renderInfo?: RenderInfo;
    cloneable?: boolean;
    cloneLifetime?: number;
    cloneLimit?: number;
    cloneDynamic?: boolean;
    cloneAvatarEntity?: boolean;
    cloneOriginID?: string;
    grab?: GrabProperties;
    itemName?: string;
    itemDescription?: string;
    itemCategories?: string;
    itemArtist?: string;
    itemLicense?: string;
    limitedRun?: number;
    editionNumber?: number;
    entityInstanceNumber?: number;
    marketplaceID?: string;
    certificateID?: string;
    staticCertificateVersion?: number;

    // Box
    color?: Color;
    alpha?: number;

    // Grid
    // color?: Color;
    // alpha?: number;
    followCamera?: boolean;
    majorGridEvery?: number;
    minorGridEvery?: number;

    // Image
    // color?: Color;
    // alpha?: number;
    imageURL?: string;
    emissive?: boolean;
    keepAspectRatio?: boolean;
    billboardMode?: "none" | "yaw" | "full";
    subImage?: Rect;

    // Light
    // color?: Color;
    intensity?: number;
    falloffRadius?: number;
    isSpotlight?: number;
    exponent?: number;
    cutoff?: number;

    // Material
    materialURL?: string;
    priority?: number;
    parentMaterialName?: string | number;
    materialMappingMode?: "uv" | "projected";
    materialMappingPos?: vec2;
    materialMappingScale?: vec2;
    materialMappingRot?: number;
    materialData?: string;
    materailRepeat?: boolean;

    // Model
    modelURL?: string;
    textures?: string;
    originalTextures?: string;
    shapeType?: "none" | "box" | "sphere" | "capsule-x" | "capsule-y" | "capsule-z" | "cylidner-x" | "cylinder-y" | "cylinder-z" | "hull" | "compound" | "simple-hull" | "simple-compound" | "static-mesh" | "plane";
    compoundShapeURL?: string;
    animation?: EntityAnimationProperties;
    jointRotation?: quat[];
    jointRotationsSet?: boolean[];
    jointTranslations?: vec3[];
    jointTranslationsSet?: boolean[];
    relayParentJoints?: boolean;

    // ParticleEffect
    isEmitting?: boolean;
    maxParticles?: number;
    lifespan?: number;
    emitRate?: number;
    emitSpeed?: number;
    spreadSpead?: number;
    emitAcceleration?: vec3;
    accelerationSpread?: vec3;
    emitterShouldTrail?: boolean;
    emitOrientation?: quat;
    emitDimensions?: vec3;
    emitRadiusStart?: number;
    polarStart?: number;
    polarFinish?: number;
    azimuthStart?: number;
    //textures?: string;
    particleRadius?: number;
    radiusStart?: number;
    radiusFinish?: number;
    radiusSpread?: number;
    // color?: Color;
    // alpha? number;
    colorStart?: Color;
    colorFinish?: Color;
    colorSpread?: Color;
    particleSpin?: number;
    spinStart?: number;
    spinFinish?: number;
    spinSpread?: number;
    rotateWithEntity?: boolean;

    // Line
    // color?: Color;
    linePoints?: vec3[];
    lineWidth?: number;

    // Polyline
    // color?: Color;
    // linePoints?: vec3[];
    normals?: vec3[];
    strokeWidths?: number[];
    strokeColors?: vec3[];
    // textures? string;
    isUVModeStretch?: boolean;

    // PolyVox
    voxelVolumeSize?: vec3;
    voxelData?: string;
    voxelSurfaceStyle?: 0 | 1 | 2 | 3; // marching cubes, cubic, edged cubic, edged marching cubes.
    xTextureURL?: string;
    yTextureURL?: string;
    zTextureURL?: string;
    xNNeighborID?: string;
    yNNeighborID?: string;
    zNNeighborID?: string;
    xPNeighborID?: string;
    yPNeighborID?: string;
    zPNeighborID?: string;

    // Shape
    // color?: Color
    shape?: "Circle" | "Cube" | "Cone" | "Cylinder" | "Dodecahedron" | "Hexagon" | "Icosahedron" | "Octagon" | "Octahedron" | "Quad" | "Sphere" | "Tetrahedron" | "Torus" | "Triangle";

    // Text
    text?: string;
    lineHeight?: number;
    textColor?: Color;
    backgroundColor?: Color;
    //billboardMode?: "none" | "yaw" | "full";

    // Web
    sourceUrl?: string;
    dpi?: number;

    // Zone
    // shapeType?: ...
    // compoundShapeURL?: string
    keyLightMode?: "inherit" | "enabled" | "disabled";
    keyLight?: KeyLightProperties;
    ambientLightMode?: "inherit" | "enabled" | "disabled";
    ambientLight?: AmbientLightProperties;
    skyboxMode?: "inherit" | "enabled" | "disabled";
    skybox?: SkyboxProperties;
    hazeMode?: "inherit" | "enabled" | "disabled";
    haze?: HazeProperties;
    bloomMode?: "inherit" | "enabled" | "disabled";
    bloom?: BloomProperties;
    flyingAllowed?: boolean;
    ghostingAllowed?: boolean;
    filterURL?: string;
}

declare namespace Entities {
    function addEntity(properties: EntityProperties, type: boolean | "local" | "domain" | "avatar"): string;
    function editEntity(entityId: string, properties: EntityProperties): string;
    function deleteEntity(entityID: string);
}

declare var console: {
    log(msg: string);
    warn(msg: string);
    error(msg: string);
}