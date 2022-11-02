import { autorun, makeAutoObservable, toJS } from "mobx";


const colorPallete = {
    'light': {
        primaryBackground: 'rgb(240,250,250)',
        fontColorPrimary: 'rgb(0,0,0)',
        secondaryBackground: '#ebe8de',
        tertiaryBackgroundColor:'rgb(250,250,250)',
        scenarioCardSelected: '#5a8359',
        header: 'rgb(5,119,80)',
        formData: '#edebe3f5',
        card:"#efeeeff7",
        scenarioCard:'#fff',
        navbar:'rgb(200,210,210)'
    },
    'dark': {
        primaryBackground: 'rgb(50,50,55)',
        fontColorPrimary: 'rgb(230,230,230)',
        secondaryBackground: 'rgb(40,40,40)',
        tertiaryBackgroundColor:'rgb(60,60,60)',
        scenarioCardSelected: 'rgb(20,20,40)',
        header: 'rgb(220,220,220)',
        formData: 'rgb(60,60,60)',
        card:"rgb(160,160,163)",
        scenarioCard:"rgb(160,160,163)",
        navbar:'rgb(30,30,30)'
    },
    'trueDark': {
        primaryBackground: 'rgba(25, 25, 25, 1)',
        fontColorPrimary: 'rgb(230,230,230)',
        secondaryBackground: 'rgb(40,40,40)',
        tertiaryBackgroundColor:'rgb(60,60,60)',
        scenarioCardSelected: 'rgb(20,20,40)',
        header: 'rgb(220,220,220)',
        formData: 'rgb(60,60,60)',
        card:"rgb(160,160,163)",
        scenarioCard:"rgb(160,160,163)",
        navbar:'rgb(20,20,20)'
    }

}

export class ThemeStore {
    theme: Theme = 'light'
    availableThemes : Theme[] = ['light','dark','trueDark']

    get colors() {
        return colorPallete[this.theme]
    }

    toggleTheme() {
        const currentIndex = this.availableThemes.indexOf(this.theme)
        console.log(currentIndex,this.availableThemes.length)
        if(currentIndex+1 == this.availableThemes.length){
            this.theme = this.availableThemes[0]
        }
        else{
            this.theme = this.availableThemes[currentIndex+1]
        }
        
    }


    constructor() {
        makeAutoObservable(this);
    }

}

export const themeStore = new ThemeStore();

type Theme = 'dark' | 'light' | 'trueDark'
//#dad7cd