import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Login from "./Pages/Login";
import ChangePassword from './Pages/ChangePassword';
import Register from './Pages/Register';
import AllData from './Pages/AllData';
import IssueInVoice from "./Pages/IssueInVoice";
import IssueQuote from "./Pages/IssueQuote";
import Users from "./Pages/Users";
import FeePayment from './Pages/FeePayment';
import EditFeePayment from "./Pages/EditFeePayment";
import AsaseYeDurufrom from './Pages/AsaseYeDuru';
import CreateBeds from "./Pages/CreateBeds";
import AllDeaceased from "./Pages/AllDeaceased";
import GetDeceased from "./Pages/GetDeceased";
import GetClients from "./Pages/GetClients";
import NewInvoice from "./Pages/NewInvoice";
import NewQuote from './Pages/NewQuote';
import RepresentDeceased from "./Pages/RepresentDeceased";
import DeceasedInvoice from "./Pages/DeceasedInvoice";
import EditBed from "./Pages/EditBed";
import DeleteBed from "./Pages/DeleteBed";
import NamingConvention from "./Pages/NamingConvention";
import Test from './Pages/Test2';
import Error from './Pages/Error';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Error />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-data" element={<AllData />} />
        <Route path="/issue-invoice" element={<IssueInVoice />} />
        <Route path="/issue-quote" element={<IssueQuote />} />
        <Route path="/users" element={<Users />} />
        <Route path="/fee-payment" element={<FeePayment />} />
        <Route path="/edit-fees" element={<EditFeePayment />} />
        <Route path="/all-beds" element={<AsaseYeDurufrom />} />
        <Route path="/create-new-bed" element={<CreateBeds />} />
        <Route path="/all-deceased" element={<AllDeaceased />} />
        <Route path="/get-deceased" element={<GetDeceased />} />
        <Route path="/get-clients" element={<GetClients />} />
        <Route path="/new-invoice" element={<NewInvoice />} />
        <Route path="/new-quote" element={<NewQuote />} />
        <Route path="/d-representing" element={<RepresentDeceased />} />
        <Route path="/new-deceased-invoice" element={<DeceasedInvoice />} />
        <Route path="/edit/bed/" element={<EditBed />} />
        <Route path="/delete/beds/" element={<DeleteBed />} />
        <Route path='/naming-convention' element={<NamingConvention />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
