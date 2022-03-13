import Vue from 'vue'
import VueRouter from 'vue-router'

import PageNotFound from '../viewsHome/PageNotFound'
import Home from '../viewsHome/Home'

import ShellStyle from '../views/ShellStyle'
import Dns from '../views/Dns'
import Hash from '../views/Hash'
import Ip from '../views/Ip'
import Password from '../views/Password'
import Scanport from '../views/Scanport'
import Speedtest from '../views/Speedtest'
import Whois from '../views/Whois'

import Information from '../viewsNav/Information'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    redirect: '/home'
},
{
    path: "*",
    name: '404',
    component: PageNotFound
},
{
    path: '/ShellStyle',
    name: 'Shell stylisé',
    component: ShellStyle
},
{
    path: '/Dns',
    name: 'Information DNS',
    component: Dns
},
{
    path: '/Hash',
    name: 'Convertisseur de hash',
    component: Hash
},
{
    path: '/home',
    name: 'home',
    component: Home
},

{
    path: '/Ip',
    name: 'Votre adresse IP',
    component: Ip
},
{
    path: '/Password',
    name: 'Générateur de mot de passe',
    component: Password
},
{
    path: '/Scanport',
    name: 'Scan de port',
    component: Scanport
},
{
    path: '/Speedtest',
    name: 'Test de débit',
    component: Speedtest
},
{
    path: '/Whois',
    name: 'Informations WHOIS',
    component: Whois
},
{
    path: '/vue/Information',
    name: 'Information',
    component: Information
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router