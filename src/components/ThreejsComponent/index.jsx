import React from 'react';
import style from './style.module.scss';
import * as THREE from 'three'
import color from '../../constants/colors'
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import Stats from 'three/examples/jsm/libs/stats.module';

class ThreejsComponent extends React.Component{
    componentDidMount() {
        this.width = this.mount.clientWidth
        this.height = this.mount.clientHeight
        console.log(`${this.width} | ${this.height}`)

        let startX = -600/*this.width * (-0.9)*/;
        let startY = this.height;
        let startZ = -400;
        this.word = [ //// letter R
            {x: startX ,y: startY ,z: startZ },      {x: startX + 150 ,y: startY ,z: startZ },      {x: startX + 250 ,y: startY ,z: startZ },       {x: startX + 350 ,y: startY ,z: startZ },
            {x: startX ,y: startY-100 ,z: startZ },                                                                                                     {x: startX + 450 ,y: startY-100 ,z: startZ },
            {x: startX ,y: startY-250 ,z: startZ },                                                                                                      {x: startX + 500 ,y: startY-250 ,z: startZ },
            {x: startX ,y: startY-450 ,z: startZ },                                                                                                   {x: startX + 500 ,y: startY-450 ,z: startZ },
            {x: startX ,y: startY-650 ,z: startZ },  {x: startX + 150 ,y: startY-650 ,z: startZ },  {x: startX + 300 ,y: startY-650 ,z: startZ },  {x: startX + 450 ,y: startY-650 ,z: startZ },
            {x: startX ,y: startY-800 ,z: startZ },                                                                                     {x: startX + 300 ,y: startY-800 ,z: startZ },
            {x: startX ,y: startY-950 ,z: startZ },                                                                                         {x: startX + 350 ,y: startY-950 ,z: startZ },
            {x: startX ,y: startY-1100 ,z: startZ },                                                                                            {x: startX + 450 ,y: startY-1100 ,z: startZ },
            {x: startX ,y: startY-1200 ,z: startZ },                                                                                                {x: startX + 550,y: startY-1200 ,z: startZ },
            {x: startX ,y: startY-1300 ,z: startZ },                                                                                                {x: startX + 650 ,y: startY-1300 ,z: startZ },
        ]

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( color.routerBg );

        this.scene.add( new THREE.AmbientLight( 0x505050 ) );

        let light = new THREE.SpotLight( 0xffffff, 1.5 );
        light.position.set( 0, 500, 2000 );
        light.angle = Math.PI / 6;
        light.castShadow = true;
        light.shadow.camera.near = 1000;
        light.shadow.camera.far = 4000;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        this.scene.add( light );

        this.objects = [];

        this.geometry = new THREE.BoxBufferGeometry( 80, 80, 80 );
        for ( let i = 0; i < 50; i ++ ) {
            let color = i > this.word.length - 1 ? 0xFFA500 : 0xE91E63;
            let object = new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial( { color } ) );

            object.position.x = 2 * Math.random() * this.width - this.width ;
            object.position.y = 2 * Math.random() * this.height - this.height ;
            object.position.z = -Math.random() * 450 - 450;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            // object.scale.x = Math.random() * 2 + 1;
            // object.scale.y = Math.random() * 2 + 1;
            // object.scale.z = Math.random() * 2 + 1;
            object.castShadow = true;
            object.receiveShadow = true;

            this.scene.add( object );
            this.objects.push( object );
        }

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.width, this.height)

        this.mount.appendChild( this.renderer.domElement )

        let controls = new DragControls( this.objects, this.camera, this.renderer.domElement );
        controls.addEventListener( 'dragstart', function ( event ) {
            event.object.material.emissive.set( 0xaaaaaa );
        } );
        controls.addEventListener( 'dragend', function ( event ) {
            event.object.material.emissive.set( 0x000000 );
        } );

        // this.stats = new Stats();
        // this.mount.appendChild( this.stats.dom );
        //
        window.addEventListener( 'resize', this.onWindowResize, false );
        this.animate()
    }

    throwingCube = () => {

    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }
    animate = () => {
        requestAnimationFrame( this.animate );
        this.renderScene();
        // this.stats.update();

        for (let i = 0; i < this.objects.length; i++) {

            if (i <= this.word.length -1 && this.word[i]){
                let finX = this.word[i].x;
                let finY = this.word[i].y;
                let finZ = this.word[i].z;
                if (Math.ceil(this.objects[i].position.y) !== finY || Math.ceil(this.objects[i].position.x) !== finX) {

                    if (finX - this.objects[i].position.x <= 1 && finX - this.objects[i].position.x >= -1) this.objects[i].position.x = finX
                        else this.objects[i].position.x += (finX - this.objects[i].position.x) / 50;

                    if (finY - this.objects[i].position.y <= 1 && finY - this.objects[i].position.y >= -1) this.objects[i].position.y = finY
                        else this.objects[i].position.y += (finY - this.objects[i].position.y) / 50

                    if (finZ - this.objects[i].position.z <= 1 && finZ - this.objects[i].position.z >= -1) this.objects[i].position.z = finZ
                    else this.objects[i].position.z += (finZ - this.objects[i].position.z) / 50

                    this.objects[i].rotation.x += Math.random() * 0.01;
                    this.objects[i].rotation.y += Math.random() * 0.01;
                } else {
                    if (this.objects[i].rotation.x !== 45 || this.objects[i].rotation.x !== -45) this.objects[i].rotation.x += (45 - this.objects[i].rotation.x) / 100
                    if (this.objects[i].rotation.y !== 0) this.objects[i].rotation.y += (0 - this.objects[i].rotation.y) / 100
                    if (this.objects[i].rotation.z !== 45 || this.objects[i].rotation.z !== -45) this.objects[i].rotation.z += (45 - this.objects[i].rotation.z) / 100
                }
            } else {
                this.objects[i].rotation.x += Math.random() * 0.007;
                this.objects[i].rotation.y += Math.random() * 0.007;
            }
        }
    }
    renderScene = () => {
        this.renderer.render( this.scene, this.camera );
    }

    render(){
        return(
          <div
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '0'
            }}
            ref={(mount) => { this.mount = mount }}
          />
        )
    }
}

export default ThreejsComponent;
