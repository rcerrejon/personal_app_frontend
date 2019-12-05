import React from 'react';
import style from './style.scss';
import * as THREE from 'three'
import color from '../../constants/colors'
import { connect } from 'react-redux';
// import {DragControls} from 'three/examples/jsm/controls/DragControls';

class ThreejsComponent extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        scene: undefined
      }
    }

    componentDidMount() {
        this.width = this.mount.clientWidth
        this.height = this.mount.clientHeight

        let startX = 300/*this.width * (-0.9)*/;
        let startY = this.height - 350;
        let startZ = -400;
        //
        this.letter_R = {
          color: 0xFFFFFF,
          contur: [
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
        }
        this.letter_R = this.letter_R.contur.map(el => {
        el.color = this.letter_R.color
        return el
      })

        this.letter_A = {
          color: 0xFFFFFF,
          contur: [
                                                              {x: startX + 225 ,y: startY ,z: startZ },
                              {x: startX + 150 ,y: startY - 100 ,z: startZ },            {x: startX + 300 ,y: startY - 100 ,z: startZ },
                            {x: startX + 100 ,y: startY - 200 ,z: startZ },                 {x: startX + 350 ,y: startY - 200 ,z: startZ },
                        {x: startX + 50 ,y: startY - 300 ,z: startZ },                          {x: startX + 400 ,y: startY - 300 ,z: startZ },
                  {x: startX ,y: startY - 400 ,z: startZ },  {x: startX + 100 ,y: startY - 400 ,z: startZ }, {x: startX + 200 ,y: startY - 400 ,z: startZ }, {x: startX + 300 ,y: startY - 400 ,z: startZ }, {x: startX + 375 ,y: startY - 400 ,z: startZ },    {x: startX + 450 ,y: startY - 400 ,z: startZ },
              {x: startX - 50 ,y: startY - 500 ,z: startZ },                                         {x: startX + 500 ,y: startY - 500 ,z: startZ },
            {x: startX - 100 ,y: startY - 600 ,z: startZ },                                             {x: startX + 550 ,y: startY - 600 ,z: startZ },
          ]
        }
        this.letter_A = this.letter_A.contur.map(el => {
          el.color = this.letter_A.color
          return el
        })

        this.backgrd_Angular = {
          color: 0xA60000,
          depth: -100,
          contur: [
                                                            {x: startX + 225 ,y: startY + 200 ,z: startZ },
            {x: startX + 25 ,y: startY + 100 ,z: startZ },{x: startX + 125 ,y: startY + 100 ,z: startZ },{x: startX + 225 ,y: startY + 100 ,z: startZ },{x: startX + 325 ,y: startY + 100 ,z: startZ }, {x: startX + 425 ,y: startY + 100 ,z: startZ },
            {x: startX - 175 ,y: startY ,z: startZ }, {x: startX - 75 ,y: startY ,z: startZ }, {x: startX + 25 ,y: startY ,z: startZ }, {x: startX + 125 ,y: startY ,z: startZ },{x: startX + 225 ,y: startY ,z: startZ }, {x: startX + 325 ,y: startY ,z: startZ }, {x: startX + 425 ,y: startY ,z: startZ }, {x: startX + 525 ,y: startY ,z: startZ }, {x: startX + 625 ,y: startY ,z: startZ },
            {x: startX - 350 ,y: startY - 100 ,z: startZ }, {x: startX - 250 ,y: startY - 100 ,z: startZ }, {x: startX - 150 ,y: startY - 100 ,z: startZ },{x: startX - 50 ,y: startY - 100 ,z: startZ },{x: startX + 50 ,y: startY - 100 ,z: startZ }, {x: startX + 150 ,y: startY - 100 ,z: startZ },{x: startX + 225 ,y: startY - 100 ,z: startZ }, {x: startX + 300 ,y: startY - 100 ,z: startZ }, {x: startX + 400 ,y: startY - 100 ,z: startZ }, {x: startX + 500 ,y: startY - 100 ,z: startZ }, {x: startX + 600 ,y: startY - 100 ,z: startZ }, {x: startX + 700 ,y: startY - 100 ,z: startZ }, {x: startX + 800 ,y: startY - 100 ,z: startZ },
            {x: startX - 300 ,y: startY - 200 ,z: startZ }, {x: startX - 200 ,y: startY - 200 ,z: startZ }, {x: startX - 100 ,y: startY - 200 ,z: startZ }, {x: startX ,y: startY - 200 ,z: startZ }, {x: startX + 100 ,y: startY - 200 ,z: startZ }, {x: startX + 200 ,y: startY - 200 ,z: startZ }, {x: startX + 275 ,y: startY - 200 ,z: startZ },{x: startX + 350 ,y: startY - 200 ,z: startZ }, {x: startX + 450 ,y: startY - 200 ,z: startZ }, {x: startX + 550 ,y: startY - 200 ,z: startZ }, {x: startX + 650 ,y: startY - 200 ,z: startZ }, {x: startX + 750 ,y: startY - 200 ,z: startZ },
            {x: startX - 250 ,y: startY - 300 ,z: startZ }, {x: startX - 150 ,y: startY - 300 ,z: startZ }, {x: startX - 50 ,y: startY - 300 ,z: startZ }, {x: startX + 50 ,y: startY - 300 ,z: startZ }, {x: startX + 150 ,y: startY - 300 ,z: startZ }, {x: startX + 250 ,y: startY - 300 ,z: startZ }, {x: startX + 350 ,y: startY - 300 ,z: startZ }, {x: startX + 400 ,y: startY - 300 ,z: startZ }, {x: startX + 500 ,y: startY - 300 ,z: startZ }, {x: startX + 600 ,y: startY - 300 ,z: startZ }, {x: startX + 700 ,y: startY - 300 ,z: startZ },
            {x: startX - 225 ,y: startY - 400 ,z: startZ },{x: startX - 200 ,y: startY - 400 ,z: startZ },{x: startX - 100 ,y: startY - 400 ,z: startZ }, {x: startX ,y: startY - 400 ,z: startZ },  {x: startX + 100 ,y: startY - 400 ,z: startZ }, {x: startX + 200 ,y: startY - 400 ,z: startZ }, {x: startX + 300 ,y: startY - 400 ,z: startZ }, {x: startX + 375 ,y: startY - 400 ,z: startZ },    {x: startX + 450 ,y: startY - 400 ,z: startZ }, {x: startX + 550 ,y: startY - 400 ,z: startZ }, {x: startX + 650 ,y: startY - 400 ,z: startZ }, {x: startX + 675 ,y: startY - 400 ,z: startZ },
            {x: startX - 200 ,y: startY - 500 ,z: startZ }, {x: startX - 150 ,y: startY - 500 ,z: startZ }, {x: startX - 50 ,y: startY - 500 ,z: startZ }, {x: startX + 50 ,y: startY - 500 ,z: startZ }, {x: startX + 150 ,y: startY - 500 ,z: startZ }, {x: startX + 250 ,y: startY - 500 ,z: startZ }, {x: startX + 350 ,y: startY - 500 ,z: startZ }, {x: startX + 450 ,y: startY - 500 ,z: startZ },{x: startX + 500 ,y: startY - 500 ,z: startZ }, {x: startX + 600 ,y: startY - 500 ,z: startZ }, {x: startX + 650 ,y: startY - 500 ,z: startZ },
            {x: startX - 175 ,y: startY - 600 ,z: startZ }, {x: startX - 100 ,y: startY - 600 ,z: startZ }, {x: startX ,y: startY - 600 ,z: startZ },  {x: startX + 100 ,y: startY - 600 ,z: startZ }, {x: startX + 200 ,y: startY - 600 ,z: startZ }, {x: startX + 300 ,y: startY - 600 ,z: startZ },  {x: startX + 400 ,y: startY - 600 ,z: startZ }, {x: startX + 475 ,y: startY - 600 ,z: startZ }, {x: startX + 550 ,y: startY - 600 ,z: startZ }, {x: startX + 600 ,y: startY - 600 ,z: startZ },
            {x: startX - 150 ,y: startY - 700 ,z: startZ },{x: startX - 75 ,y: startY - 700 ,z: startZ }, {x: startX ,y: startY - 700 ,z: startZ },  {x: startX + 100 ,y: startY - 700 ,z: startZ }, {x: startX + 200 ,y: startY - 700 ,z: startZ }, {x: startX + 300 ,y: startY - 700 ,z: startZ },  {x: startX + 400 ,y: startY - 700 ,z: startZ }, {x: startX + 475 ,y: startY - 700 ,z: startZ }, {x: startX + 525 ,y: startY - 700 ,z: startZ }, {x: startX + 600 ,y: startY - 700 ,z: startZ },
            {x: startX ,y: startY - 800 ,z: startZ },  {x: startX + 100 ,y: startY - 800 ,z: startZ }, {x: startX + 200 ,y: startY - 800 ,z: startZ }, {x: startX + 300 ,y: startY - 800 ,z: startZ },  {x: startX + 400 ,y: startY - 800 ,z: startZ },
            {x: startX + 200 ,y: startY - 900 ,z: startZ },
          ]
        }
        this.backgrd_Angular = this.backgrd_Angular.contur.map(el => {
          el.color = this.backgrd_Angular.color
          el.z += this.backgrd_Angular.depth
          return el
        })

        // startZ = -800 ;
        this.icon_react = {
          color: 0x5FC0CE,
          contur: [
            /*top peak*/{x: startX - 100, y: startY + 200, z: startZ}, {x: startX + 900, y: startY + 200, z: startZ},
            /*left top*/{x: startX - 115, y: startY + 100, z: startZ}, {x: startX - 100, y: startY - 20, z: startZ}, {x: startX - 50, y: startY - 120, z: startZ}, {x: startX + 10 , y: startY - 220, z: startZ}, {x: startX + 70 , y: startY - 320, z: startZ}, {x: startX + 135 , y: startY - 435, z: startZ}, {x: startX + 200, y: startY - 550, z: startZ}, {x: startX + 280, y: startY - 650, z: startZ}, {x: startX + 380, y: startY - 750, z: startZ}, {x: startX + 480, y: startY - 850, z: startZ}, {x: startX + 600, y: startY - 950, z: startZ}, {x: startX + 700, y: startY - 1000, z: startZ}, {x: startX + 800, y: startY - 1030, z: startZ}, /*long axis*/{x: startX , y: startY + 200, z: startZ}, {x: startX + 100, y: startY + 170, z: startZ}, {x: startX + 200, y: startY + 125, z: startZ}, {x: startX + 300, y: startY + 80, z: startZ}, {x: startX + 400, y: startY + 20, z: startZ}, {x: startX + 500, y: startY - 80, z: startZ}, {x: startX + 585, y: startY - 170, z: startZ}, {x: startX + 675, y: startY - 280, z: startZ}, {x: startX + 750, y: startY - 380, z: startZ}, {x: startX + 810, y: startY - 480, z: startZ}, {x: startX + 860, y: startY - 580, z: startZ}, {x: startX + 890, y: startY - 680, z: startZ}, {x: startX + 910, y: startY - 780, z: startZ}, {x: startX + 905, y: startY - 880, z: startZ},
            /*right top*/{x: startX + 915, y: startY + 100, z: startZ}, {x: startX + 900, y: startY - 20, z: startZ}, {x: startX + 850, y: startY - 120, z: startZ}, {x: startX + 810 , y: startY - 220, z: startZ}, {x: startX + 770 , y: startY - 320, z: startZ}, {x: startX + 715 , y: startY - 455, z: startZ}, {x: startX + 670, y: startY - 550, z: startZ}, {x: startX + 580, y: startY - 650, z: startZ}, {x: startX + 480, y: startY - 750, z: startZ}, {x: startX + 360, y: startY - 850, z: startZ}, {x: startX + 240, y: startY - 950, z: startZ}, {x: startX + 140, y: startY - 1000, z: startZ}, {x: startX + 10, y: startY - 1030, z: startZ}, /*long axis*/{x: startX + 800, y: startY + 200, z: startZ}, {x: startX + 700, y: startY + 170, z: startZ}, {x: startX + 600, y: startY + 125, z: startZ}, {x: startX + 500, y: startY + 80, z: startZ}, {x: startX + 400, y: startY + 20, z: startZ}, {x: startX + 300, y: startY - 80, z: startZ}, {x: startX + 215, y: startY - 170, z: startZ}, {x: startX + 150, y: startY - 230, z: startZ}, {x: startX + 25 , y: startY - 380, z: startZ}, {x: startX - 35, y: startY - 480, z: startZ}, {x: startX - 85, y: startY - 580, z: startZ}, {x: startX - 115, y: startY - 680, z: startZ}, {x: startX - 135, y: startY - 780, z: startZ}, {x: startX - 140, y: startY - 880, z: startZ},
            /*left middle*/{x: startX - 250, y: startY - 315, z: startZ}, {x: startX - 165, y: startY - 250, z: startZ}, {x: startX - 80, y: startY - 205, z: startZ}, {x: startX + 10, y: startY - 160, z: startZ}, {x: startX + 100 , y: startY - 130, z: startZ}, {x: startX + 200 , y: startY - 100, z: startZ},/**/ {x: startX + 400 , y: startY - 80, z: startZ}, /**/{x: startX + 1050, y: startY - 315, z: startZ}, {x: startX + 965, y: startY - 250, z: startZ}, {x: startX + 880, y: startY - 205, z: startZ}, {x: startX + 790, y: startY - 160, z: startZ}, {x: startX + 700 , y: startY - 130, z: startZ}, {x: startX + 600 , y: startY - 100, z: startZ},
            /*right middle*/{x: startX - 250, y: startY - 485, z: startZ}, {x: startX - 165, y: startY - 550, z: startZ}, {x: startX - 80, y: startY - 595, z: startZ}, {x: startX + 10, y: startY - 640, z: startZ}, {x: startX + 100 , y: startY - 670, z: startZ}, {x: startX + 200 , y: startY - 700, z: startZ},/**/ {x: startX + 400 , y: startY - 720, z: startZ}, /**/{x: startX + 1050, y: startY - 485, z: startZ}, {x: startX + 965, y: startY - 550, z: startZ}, {x: startX + 880, y: startY - 595, z: startZ}, {x: startX + 790, y: startY - 640, z: startZ}, {x: startX + 700 , y: startY - 670, z: startZ}, {x: startX + 600 , y: startY - 700, z: startZ},

            /*middle peak*/{x: startX - 300, y: startY - 400, z: startZ},      {x: startX + 400, y: startY - 400, z: startZ , geometry: 'sphere', radius: 100},      {x: startX + 1100, y: startY - 400, z: startZ},
            /*bottom peak*/{x: startX - 100, y: startY - 1000, z: startZ}, {x: startX + 900, y: startY - 1000, z: startZ},
          ]
        }
        this.icon_react = this.icon_react.contur.map(el => {
          el.color = this.icon_react.color
          return el
        })

      this.backrd_JS = {
        color: color.github,
        contur: [
          /*top left*/{x: startX - 100, y: startY + 200, z: startZ}, {x: startX , y: startY + 200, z: startZ}, {x: startX + 100, y: startY + 200, z: startZ}, {x: startX + 200, y: startY + 200, z: startZ}, {x: startX + 300, y: startY + 200, z: startZ}, {x: startX + 400, y: startY + 200, z: startZ}, {x: startX + 500, y: startY + 200, z: startZ}, {x: startX + 600, y: startY + 200, z: startZ}, {x: startX + 700, y: startY + 200, z: startZ}, {x: startX + 800, y: startY + 200, z: startZ}, {x: startX + 900, y: startY + 200, z: startZ},
          /*top left*/{x: startX - 100, y: startY + 100, z: startZ}, {x: startX , y: startY + 100, z: startZ}, {x: startX + 100, y: startY + 100, z: startZ}, {x: startX + 200, y: startY + 100, z: startZ}, {x: startX + 300, y: startY + 100, z: startZ}, {x: startX + 400, y: startY + 100, z: startZ}, {x: startX + 500, y: startY + 100, z: startZ}, {x: startX + 600, y: startY + 100, z: startZ}, {x: startX + 700, y: startY + 100, z: startZ}, {x: startX + 800, y: startY + 100, z: startZ}, {x: startX + 900, y: startY + 100, z: startZ},
          /*top left*/{x: startX - 100, y: startY , z: startZ}, {x: startX , y: startY , z: startZ}, {x: startX + 100, y: startY , z: startZ}, {x: startX + 200, y: startY , z: startZ}, {x: startX + 300, y: startY , z: startZ}, {x: startX + 400, y: startY , z: startZ}, {x: startX + 500, y: startY , z: startZ}, {x: startX + 600, y: startY , z: startZ}, {x: startX + 700, y: startY , z: startZ}, {x: startX + 800, y: startY , z: startZ}, {x: startX + 900, y: startY , z: startZ},
          /*top left*/{x: startX - 100, y: startY - 100, z: startZ}, {x: startX , y: startY - 100, z: startZ}, {x: startX + 100, y: startY - 100, z: startZ}, {x: startX + 200, y: startY - 100, z: startZ}, {x: startX + 300, y: startY - 100, z: startZ}, {x: startX + 400, y: startY - 100, z: startZ}, {x: startX + 500, y: startY - 100, z: startZ}, {x: startX + 600, y: startY - 100, z: startZ}, {x: startX + 700, y: startY - 100, z: startZ}, {x: startX + 800, y: startY - 100, z: startZ}, {x: startX + 900, y: startY - 100, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 200, z: startZ}, {x: startX , y: startY - 200, z: startZ}, {x: startX + 100, y: startY - 200, z: startZ}, {x: startX + 200, y: startY - 200, z: startZ}, {x: startX + 300, y: startY - 200, z: startZ}, {x: startX + 400, y: startY - 200, z: startZ}, {x: startX + 500, y: startY - 200, z: startZ}, {x: startX + 600, y: startY - 200, z: startZ}, {x: startX + 700, y: startY - 200, z: startZ}, {x: startX + 800, y: startY - 200, z: startZ}, {x: startX + 900, y: startY - 200, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 300, z: startZ}, {x: startX , y: startY - 300, z: startZ}, {x: startX + 100, y: startY - 300, z: startZ}, {x: startX + 200, y: startY - 300, z: startZ}, {x: startX + 300, y: startY - 300, z: startZ}, {x: startX + 400, y: startY - 300, z: startZ}, {x: startX + 500, y: startY - 300, z: startZ}, {x: startX + 600, y: startY - 300, z: startZ}, {x: startX + 700, y: startY - 300, z: startZ}, {x: startX + 800, y: startY - 300, z: startZ}, {x: startX + 900, y: startY - 300, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 400, z: startZ}, {x: startX , y: startY - 400, z: startZ}, {x: startX + 100, y: startY - 400, z: startZ}, {x: startX + 200, y: startY - 400, z: startZ}, {x: startX + 300, y: startY - 400, z: startZ}, {x: startX + 400, y: startY - 400, z: startZ}, {x: startX + 500, y: startY - 400, z: startZ}, {x: startX + 600, y: startY - 400, z: startZ}, {x: startX + 700, y: startY - 400, z: startZ}, {x: startX + 800, y: startY - 400, z: startZ}, {x: startX + 900, y: startY - 400, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 500, z: startZ}, {x: startX , y: startY - 500, z: startZ}, {x: startX + 100, y: startY - 500, z: startZ}, {x: startX + 200, y: startY - 500, z: startZ}, {x: startX + 300, y: startY - 500, z: startZ}, {x: startX + 400, y: startY - 500, z: startZ}, {x: startX + 500, y: startY - 500, z: startZ}, {x: startX + 600, y: startY - 500, z: startZ}, {x: startX + 700, y: startY - 500, z: startZ}, {x: startX + 800, y: startY - 500, z: startZ}, {x: startX + 900, y: startY - 500, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 600, z: startZ}, {x: startX , y: startY - 600, z: startZ}, {x: startX + 100, y: startY - 600, z: startZ}, {x: startX + 200, y: startY - 600, z: startZ}, {x: startX + 300, y: startY - 600, z: startZ}, {x: startX + 400, y: startY - 600, z: startZ}, {x: startX + 500, y: startY - 600, z: startZ}, {x: startX + 600, y: startY - 600, z: startZ}, {x: startX + 700, y: startY - 600, z: startZ}, {x: startX + 800, y: startY - 600, z: startZ}, {x: startX + 900, y: startY - 600, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 700, z: startZ}, {x: startX , y: startY - 700, z: startZ}, {x: startX + 100, y: startY - 700, z: startZ}, {x: startX + 200, y: startY - 700, z: startZ}, {x: startX + 300, y: startY - 700, z: startZ}, {x: startX + 400, y: startY - 700, z: startZ}, {x: startX + 500, y: startY - 700, z: startZ}, {x: startX + 600, y: startY - 700, z: startZ}, {x: startX + 700, y: startY - 700, z: startZ}, {x: startX + 800, y: startY - 700, z: startZ}, {x: startX + 900, y: startY - 700, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 800, z: startZ}, {x: startX , y: startY - 800, z: startZ}, {x: startX + 100, y: startY - 800, z: startZ}, {x: startX + 200, y: startY - 800, z: startZ}, {x: startX + 300, y: startY - 800, z: startZ}, {x: startX + 400, y: startY - 800, z: startZ}, {x: startX + 500, y: startY - 800, z: startZ}, {x: startX + 600, y: startY - 800, z: startZ}, {x: startX + 700, y: startY - 800, z: startZ}, {x: startX + 800, y: startY - 800, z: startZ}, {x: startX + 900, y: startY - 800, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 900, z: startZ}, {x: startX , y: startY - 900, z: startZ}, {x: startX + 100, y: startY - 900, z: startZ}, {x: startX + 200, y: startY - 900, z: startZ}, {x: startX + 300, y: startY - 900, z: startZ}, {x: startX + 400, y: startY - 900, z: startZ}, {x: startX + 500, y: startY - 900, z: startZ}, {x: startX + 600, y: startY - 900, z: startZ}, {x: startX + 700, y: startY - 900, z: startZ}, {x: startX + 800, y: startY - 900, z: startZ}, {x: startX + 900, y: startY - 900, z: startZ},
          /*top left*/{x: startX - 100, y: startY - 1000, z: startZ}, {x: startX , y: startY - 1000, z: startZ}, {x: startX + 100, y: startY - 1000, z: startZ}, {x: startX + 200, y: startY - 1000, z: startZ}, {x: startX + 300, y: startY - 1000, z: startZ}, {x: startX + 400, y: startY - 1000, z: startZ}, {x: startX + 500, y: startY - 1000, z: startZ}, {x: startX + 600, y: startY - 1000, z: startZ}, {x: startX + 700, y: startY - 1000, z: startZ}, {x: startX + 800, y: startY - 1000, z: startZ}, {x: startX + 900, y: startY - 1000, z: startZ},
        ]
      }
      this.backrd_JS = this.backrd_JS.contur.map(el => {
        el.color = this.backrd_JS.color
        return el
      })

      this.icon_JS = {
        color: 0xFFFFFF,
        depth: 100,
        contur: [
          /**/ /*{x: startX + 200, y: startY - 300, z: startZ}, {x: startX + 300, y: startY - 300, z: startZ},*/ {x: startX + 400, y: startY - 300, z: startZ},    /*{x: startX + 600, y: startY - 300, z: startZ},*/ {x: startX + 700, y: startY - 300, z: startZ},
          /*,*/ /*{x: strtX + 200, y: startY - 400, z: startZ}, {x: startX + 300, y: startY - 400, z: startZ},*/ {x: startX + 400, y: startY - 400, z: startZ},    {x: startX + 600, y: startY - 400, z: startZ}, /*{x: startX + 700, y: startY - 400, z: startZ},*/ {x: startX + 800, y: startY - 400, z: startZ},
          /**/ /*{x: startX + 200, y: startY - 500, z: startZ}, {x: startX + 300, y: startY - 500, z: startZ},*/ {x: startX + 400, y: startY - 500, z: startZ},    {x: startX + 600, y: startY - 500, z: startZ}, /*{x: startX + 700, y: startY - 500, z: startZ}, {x: startX + 800, y: startY - 500, z: startZ},*/
          /*    *!/ {x: startX + 200, y: startY - 600, z: startZ}, {x: startX + 300, y: startY - 600, z: stZ},*/ {x: startX + 400, y: startY - 600, z: startZ},    /*{x: startX + 600, y: startY - 600, z: startZ},*/ {x: startX + 700, y: startY - 600, z: startZ},
          /**/ /*{x: startX + 200, y: startY - 700, z: startZ}, {x: startX + 300, y: startY - 700, z: startZ},*/ {x: startX + 400, y: startY - 700, z: startZ},    /*{x: startX + 600, y: startY - 700, z: startZ}, {x: startX + 700, y: startY - 700, z: startZ},*/ {x: startX + 800, y: startY - 700, z: startZ},
          /**/ {x: startX + 200, y: startY - 800, z: startZ}, /*{x: startX + 300, y: startY - 800, z: startZ}, */{x: startX + 400, y: startY - 800, z: startZ},    {x: startX + 600, y: startY - 800, z: startZ}, /*{x: startX + 700, y: startY - 800, z: startZ},*/ {x: startX + 800, y: startY - 800, z: startZ},
          /*{x: startX + 200, y: startY - 900, z: startZ},    */{x: startX + 300, y: startY - 900, z: startZ}, /*{x: startX + 400, y: startY - 900, z: startZ}, {x: startX + 500, y: startY - 900, z: sta rtZ},   */{x: startX + 700, y: startY - 900, z: startZ},
        ]
      }
      //fo node_back
      // this.icon_JS.color = 0x46473F;
      //
      this.icon_JS = this.icon_JS.contur.map(el => {
        //for node_back
        // el.x -= 100
        // el.y += 200
        //
        el.color = this.icon_JS.color
        el.z += this.icon_JS.depth
        return el
      })

      this.backrd_Node = {
        color: 0x92CA3F,
        contur: [
          /*/!*top left*!/{x: startX - 100, y: startY + 200, z: startZ}, {x: startX , y: startY + 200, z: startZ}, {x: startX + 100, y: startY + 200, z: startZ}, {x: startX + 200, y: startY + 200, z: startZ},*/ {x: startX + 300, y: startY + 200, z: startZ}, {x: startX + 400, y: startY + 200, z: startZ}, {x: startX + 500, y: startY + 200, z: startZ}, {x: startX + 600, y: startY + 200, z: startZ}, {x: startX + 700, y: startY + 200, z: startZ}, {x: startX + 800, y: startY + 200, z: startZ}, {x: startX + 900, y: startY + 200, z: startZ},
          /*top left*//*{x: startX - 100, y: startY + 100, z: startZ}, {x: startX , y: startY + 100, z: startZ}, {x: startX + 100, y: startY + 100, z: startZ},*/ {x: startX + 200, y: startY + 100, z: startZ}, {x: startX + 300, y: startY + 100, z: startZ}, {x: startX + 400, y: startY + 100, z: startZ}, {x: startX + 500, y: startY + 100, z: startZ}, {x: startX + 600, y: startY + 100, z: startZ}, {x: startX + 700, y: startY + 100, z: startZ}, {x: startX + 800, y: startY + 100, z: startZ}, {x: startX + 900, y: startY + 100, z: startZ},
          /*top left*//*{x: startX - 100, y: startY , z: startZ}, {x: startX , y: startY , z: startZ},*/ {x: startX + 100, y: startY , z: startZ}, {x: startX + 200, y: startY , z: startZ}, {x: startX + 300, y: startY , z: startZ}, {x: startX + 400, y: startY , z: startZ}, {x: startX + 500, y: startY , z: startZ}, {x: startX + 600, y: startY , z: startZ}, {x: startX + 700, y: startY , z: startZ}, {x: startX + 800, y: startY , z: startZ}, {x: startX + 900, y: startY , z: startZ},
          /*top left*//*{x: startX - 100, y: startY - 100, z: startZ},*/ {x: startX , y: startY - 100, z: startZ}, {x: startX + 100, y: startY - 100, z: startZ}, {x: startX + 200, y: startY - 100, z: startZ}, {x: startX + 300, y: startY - 100, z: startZ}, {x: startX + 400, y: startY - 100, z: startZ}, {x: startX + 500, y: startY - 100, z: startZ}, {x: startX + 600, y: startY - 100, z: startZ}, {x: startX + 700, y: startY - 100, z: startZ}, {x: startX + 800, y: startY - 100, z: startZ}, {x: startX + 900, y: startY - 100, z: startZ},
          /*top left*//*{x: startX - 100, y: startY - 200, z: startZ},*/ {x: startX , y: startY - 200, z: startZ}, {x: startX + 100, y: startY - 200, z: startZ}, {x: startX + 200, y: startY - 200, z: startZ}, {x: startX + 300, y: startY - 200, z: startZ}, {x: startX + 400, y: startY - 200, z: startZ}, {x: startX + 500, y: startY - 200, z: startZ}, {x: startX + 600, y: startY - 200, z: startZ}, {x: startX + 700, y: startY - 200, z: startZ}, {x: startX + 800, y: startY - 200, z: startZ}, {x: startX + 900, y: startY - 200, z: startZ},
          /*top left*//*{x: startX - 100, y: startY - 300, z: startZ},*/ {x: startX , y: startY - 300, z: startZ}, {x: startX + 100, y: startY - 300, z: startZ}, {x: startX + 200, y: startY - 300, z: startZ}, {x: startX + 300, y: startY - 300, z: startZ}, {x: startX + 400, y: startY - 300, z: startZ}, {x: startX + 500, y: startY - 300, z: startZ}, {x: startX + 600, y: startY - 300, z: startZ}, {x: startX + 700, y: startY - 300, z: startZ}, {x: startX + 800, y: startY - 300, z: startZ}, {x: startX + 900, y: startY - 300, z: startZ},
          /*top left*//*{x: startX - 100, y: startY - 400, z: startZ},*/ {x: startX , y: startY - 400, z: startZ}, {x: startX + 100, y: startY - 400, z: startZ}, {x: startX + 200, y: startY - 400, z: startZ}, {x: startX + 300, y: startY - 400, z: startZ}, {x: startX + 400, y: startY - 400, z: startZ}, {x: startX + 500, y: startY - 400, z: startZ}, {x: startX + 600, y: startY - 400, z: startZ}, {x: startX + 700, y: startY - 400, z: startZ}, {x: startX + 800, y: startY - 400, z: startZ}, {x: startX + 900, y: startY - 400, z: startZ},
          /*top left*//*{x: startX -  y: startY - 500, z: startZ    },*/ {x: startX , y: startY - 500, z: startZ}, {x: startX + 100, y: startY - 500, z: startZ}, {x: startX + 200, y: startY - 500, z: startZ}, {x: startX + 300, y: startY - 500, z: startZ}, {x: startX + 400, y: startY - 500, z: startZ}, {x: startX + 500, y: startY - 500, z: startZ}, {x: startX + 600, y: startY - 500, z: startZ}, {x: startX + 700, y: startY - 500, z: startZ}, {x: startX + 800, y: startY - 500, z: startZ}, {x: startX + 900, y: startY - 500, z: startZ},
          /*/!*top left*!/{x: startX - 100,artY - 600, z: startZ}, {x: startX , y: startY - 600, z: startZ},*/ {x: startX + 100, y: startY - 600, z: startZ}, {x: startX + 200, y: startY - 600, z: startZ}, {x: startX + 300, y: startY - 600, z: startZ}, {x: startX + 400, y: startY - 600, z: startZ}, {x: startX + 500, y: startY - 600, z: startZ}, {x: startX + 600, y: startY - 600, z: startZ}, {x: startX + 700, y: startY - 600, z: startZ}, {x: startX + 800, y: startY - 600, z: startZ}, {x: startX + 900, y: startY - 600, z: startZ},
          /*/!*top left*!/{x: startX - 100, y: startY - 700, z: startZ}, {x: startX , y: startY - 700, z: startZ}, {x: startX + 100, y: startY - 700, z: startZ},*/ {x: startX + 200, y: startY - 700, z: startZ}, {x: startX + 300, y: startY - 700, z: startZ}, {x: startX + 400, y: startY - 700, z: startZ}, {x: startX + 500, y: startY - 700, z: startZ}, {x: startX + 600, y: startY - 700, z: startZ}, {x: startX + 700, y: startY - 700, z: startZ}, {x: startX + 800, y: startY - 700, z: startZ}, {x: startX + 900, y: startY - 700, z: startZ},
          /*/!*top left*!/{x: startX - 100, y: startY - 800, z: startZ}, {x: startX , y: startY - 800, z: startZ}, {x: startX + 100, y: startY - 800, z: startZ}, {x: startX + 200, y: startY - 800, z: startZ},*/ {x: startX + 300, y: startY - 800, z: startZ}, {x: startX + 400, y: startY - 800, z: startZ}, {x: startX + 500, y: startY - 800, z: startZ}, {x: startX + 600, y: startY - 800, z: startZ}, {x: startX + 700, y: startY - 800, z: startZ}, {x: startX + 800, y: startY - 800, z: startZ}, {x: startX + 900, y: startY - 800, z: startZ},
          /*/!*top left*!/{x: startX - 100, y: startY - 900, z: startZ}, {x: startX , y: startY - 900, z: startZ}, {x: startX + 100, y: startY - 900, z: startZ}, {x: startX + 200, y: startY - 900, z: startZ}, {x: startX + 300, y: startY - 900, z: startZ},*/ {x: startX + 400, y: startY - 900, z: startZ}, {x: startX + 500, y: startY - 900, z: startZ}, {x: startX + 600, y: startY - 900, z: startZ}, {x: startX + 700, y: startY - 900, z: startZ}, {x: startX + 800, y: startY - 900, z: startZ}, {x: startX + 900, y: startY - 900, z: startZ},
          /*/!*top left*!/{x: startX - 100, y: startY - 1000, z: startZ}, {x: startX , y: startY - 1000, z: startZ}, {x: startX + 100, y: startY - 1000, z: startZ}, {x: startX + 200, y: startY - 1000, z: startZ}, {x: startX + 300, y: startY - 1000, z: startZ}, {x: startX + 400, y: startY - 1000, z: startZ},*/ {x: startX + 500, y: startY - 1000, z: startZ}, {x: startX + 600, y: startY - 1000, z: startZ}, {x: startX + 700, y: startY - 1000, z: startZ}, {x: startX + 800, y: startY - 1000, z: startZ}, {x: startX + 900, y: startY - 1000, z: startZ},
        ]
      }
      this.backrd_Node = this.backrd_Node.contur.map(el => {
        el.color = this.backrd_Node.color
        return el
      })

      let icons_arr = [
        {
          name: 'icon_js',
          arr: [...this.backrd_JS, ...this.icon_JS]
        },
        // {
        //   name: 'icon_angular',
        //   arr: [...this.backgrd_Angular, ...this.letter_A]
        // },
        // {
        //   name: 'icon_react',
        //   arr: [...this.icon_react]
        // },
      ]
      let random_icon = /*Math.round(Math.random() * 2)*/ 0;

      // console.log(random_icon)

      this.currentFigure = icons_arr[random_icon].name

        // this.word = [...this.letter_A, ...this.backgrd_Angular]
        this.word = [...icons_arr[random_icon].arr]
        //
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( this.props.common.theme === 'dark' ? color.routerBg : color.light );

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

        let radiusDefault = 40;
        let geometryLib = {
          cube: new THREE.BoxBufferGeometry( 80, 80, 80 ),
          sphere: new THREE.SphereBufferGeometry(radiusDefault, 24, 18)
        }


        for ( let i = 0; i <= this.word.length - 1; i++ ) {

            let color = i <= this.word.length - 1 ? this.word[i].color : 0xFFA500;
            let object = new THREE.Mesh( geometryLib[this.word[i].geometry || 'cube'], new THREE.MeshLambertMaterial( { color }) );

            object.position.x = 2 * Math.random() * this.width - this.width ;
            object.position.y = 2 * Math.random() * this.height - this.height ;
            object.position.z = -Math.random() * 450 - 450;

            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;

            object.castShadow = true;
            object.receiveShadow = true;

            if (this.currentFigure === 'icon_react') {
              if (this.word[i].geometry === 'sphere' && this.word[i].radius){
                let radiusMultiplier = (this.word[i].radius / radiusDefault)
                object.scale.x *= radiusMultiplier;
                object.scale.y *= radiusMultiplier;
                object.scale.z *= radiusMultiplier;
              } else {
                let multiplier = 0.5;
                object.scale.x *= multiplier;
                object.scale.y *= multiplier;
                object.scale.z *= multiplier;
              }
            }



            this.scene.add( object );
            this.objects.push( object );
        }

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.setSize(this.width, this.height)

        this.mount.appendChild( this.renderer.domElement )

      // SyntaxError: Unexpected token {
      // ыыыыыы
        // this.controls = new DragControls( this.objects, this.camera, this.renderer.domElement );
        // this.controls.addEventListener( 'dragstart', function ( event ) {
        //     event.object.material.emissive.set( 0xaaaaaa );
        // } );
        // this.controls.addEventListener( 'dragend', function ( event ) {
        //     event.object.material.emissive.set( 0x000000 );
        // } );

        // this.stats = new Stats();
        // this.mount.appendChild( this.stats.dom );

        window.addEventListener( 'resize', this.onWindowResize, false );
        this.animate()
    }

    throwingCube = () => { // TODO

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
                    if (this.objects[i].rotation.x !== 0 || this.objects[i].rotation.x !== -0) this.objects[i].rotation.x += (0 - this.objects[i].rotation.x) / 100
                    if (this.objects[i].rotation.y !== 0 || this.objects[i].rotation.y !== -0) this.objects[i].rotation.y += (0 - this.objects[i].rotation.y) / 100
                    if (this.objects[i].rotation.z !== 0 || this.objects[i].rotation.z !== -0) this.objects[i].rotation.z += (0 - this.objects[i].rotation.z) / 100
                }
            } else {
                this.objects[i].rotation.x += Math.random() * 0.007;
                this.objects[i].rotation.y += Math.random() * 0.007;
            }
        }
    }
    renderScene = () => {
      let scene = this.scene
      scene.background = new THREE.Color( this.props.common.theme === 'dark' ? color.routerBg : color.light );
      this.renderer.render( scene, this.camera );
    }

    componentWillUnmount() {
      // window.removeEventListener('resize', this.onWindowResize)
      // this.controls.removeEventListener( 'dragstart', function ( event ) {
      //   event.object.material.emissive.set( 0xaaaaaa );
      // } );
      // this.controls.removeEventListener( 'dragend', function ( event ) {
      //   event.object.material.emissive.set( 0x000000 );
      // } );
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

const mapStateToProps = (state) => {
  return {
    common: state.common
  }
}
export default connect(mapStateToProps)(ThreejsComponent);
