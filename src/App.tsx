import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/core/Navbar'
import { BudgetCalculator } from './components/BudgerCalculator'
import { themeStore } from './stores/ThemeStore';
import { observer } from 'mobx-react-lite';
import { navigationStore } from './stores/NavigationStore';
import { Summary } from './components/Summary';

const App = observer(() => {

  const getAppCorePadding = () => {
    return "0vw 10vw 10vw 10vw"
  }
  return (
    <div className="App" style={{ gridTemplateRows: 'auto auto', backgroundColor: themeStore.colors.primaryBackground,minHeight:'100vh' }}>
      <div style={{ height: '80px' }}>
        <Navbar />
      </div>
      <div style={{ height: '80%', color: themeStore.colors.fontColorPrimary, padding: getAppCorePadding(),display:'flex',justifyContent:'flex-start' }}>
        {navigationStore.currentPage == "BudgetCalculator" &&

          <BudgetCalculator type={"General"} />

        }
        {navigationStore.currentPage == "Summary" &&

          <Summary />

        }
      </div>
    </div >


  );
})

export default App;
