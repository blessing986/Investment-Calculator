import { useState } from "react";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    //  Should be triggered when form is submitted
    setUserInput(userInput);
  };

  const yearlyData = []; //  per-year results

  if (userInput) {
    let currentSavings = Number(userInput["current-savings"]);
    const yearlyContribution = Number(userInput["yearly-contribution"]);
    const expectedReturn = Number(userInput["expected-return"]) / 100;
    const duration = Number(userInput["duration"]);

    //  The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />

      <UserInput onCalculate={calculateHandler} />

      {/* dynamically output a fallback text */}

      {!userInput && (
        <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
      )}
      {userInput && (
        <ResultsTable
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
