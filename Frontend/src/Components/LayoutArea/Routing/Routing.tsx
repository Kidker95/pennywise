import { Route, Routes } from "react-router-dom";
import { AddNewBudget } from "../../BudgetArea/AddNewBudget/AddNewBudget";
import { BudgetManager } from "../../BudgetArea/BudgetManager/BudgetManager";
import { EditBudget } from "../../BudgetArea/EditBudget/EditBudget";
import { AddNewExpense } from "../../ExpensesArea/AddNewExpense/AddNewExpense";
import { EditExpense } from "../../ExpensesArea/EditExpense/EditExpense";
import ExpenseCard from "../../ExpensesArea/ExpenseCard/ExpenseCard";
import { Home } from "../../Pages/Home/Home";
import { Page404 } from "../../Pages/Page404/Page404";
import { PersonalPage } from "../../Pages/PersonalPage/PersonalPage";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import "./Routing.css";
import { AddPartner } from "../../UserArea/AddPartner/AddPartner";


export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/*" element={<Page404 />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/personal" element={<PersonalPage />} />
                <Route path="/add-partner" element={<AddPartner />} />

                <Route path="/add-expense" element={<AddNewExpense />} />
                <Route path="/expenses/:expId" element={<EditExpense />} />
                <Route path="/expenses/" element={<ExpenseCard />} />

                <Route path="/budgets" element={<BudgetManager />} />
                <Route path="/add-budget" element={<AddNewBudget />} />
                <Route path="/budgets/:id" element={<EditBudget />} />

            </Routes>
        </div>
    );
}
