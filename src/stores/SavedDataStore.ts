import { autorun, makeAutoObservable, toJS } from "mobx";


export class SavedDataStore {
    coi: Record<string, any> = {}
    scenarios: Record<string, any> = {}


    saveCoi(type,coi) {
           
            if(type == "Master"){
                this.coi = {}
                this.coi = coi
            }
            else{
                this.scenarios[coi.id] = coi
            }
            
            localStorage.setItem("coi", JSON.stringify(this.coi))
            localStorage.setItem("scenarios", JSON.stringify(this.scenarios))
        }
    deleteCoi(id) {
            delete this.coi[id]
            localStorage.setItem("coi", JSON.stringify(this.coi))
        }

    constructor() {
            makeAutoObservable(this);
            try {
                const localSavedCoi = JSON.parse(localStorage.getItem('coi')) ?? {}
                const localSavedScenarios = JSON.parse(localStorage.getItem('scenarios')) ?? {}
                this.coi = localSavedCoi
                this.scenarios = localSavedScenarios
            }
            catch (er) {
                console.warn(er)
            }

        }

    }

    export const savedDataStore = new SavedDataStore();


type Bet = {
        betType: string,
        matchId: string,
        homeTeam: string,
        awayTeam: string,
        bestCombo: any,
        bets: any,
        sites: any,
        houseCutPerCombo?: any,
        apodosi: any
    }

type Match = {
    matchId: string,
    homeTeam: string,
    awayTeam: string,

    sites: Record<string, SiteInstance>
}


type SiteInstance = {
    id: string
    name: string
    homeWin: string
    draw: string
    awayWin: string
}