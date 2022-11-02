import { autorun, makeAutoObservable, toJS } from "mobx";


export class NavigationStore {
    currentPage : string = "BudgetCalculator"
    history: string[] = []

    setNavigation(nav:string){
        this.currentPage = nav
        this.history.push(nav)
    }

    constructor() {
        makeAutoObservable(this);
    }

}

export const navigationStore = new NavigationStore();


