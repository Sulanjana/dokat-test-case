import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./component/footer";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    allowance: "",
    deduction: "",
    thp_amount: "",
  });

  const total = (parent, child) => {
    const totalValue = parent.reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem[child]);
    }, 0);

    return totalValue;
  };

  const fetchData = async () => {
    try {
      const response = await fetch("api/payroll/dummy.json"); // URL API
      const result = await response.json();
      setData(result.data);
      setSummary({
        allowance: total(result.data, "allowance"),
        deduction: total(result.data, "deduction"),
        thp_amount: total(result.data, "thp_amount"),
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  console.log(data);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
        <div style={{ padding: 20 }}>
          <h1 style={{ textAlign: "center" }}>Data Karyawan</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>NIK</th>
                <th>No THP</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                error === "" &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.emp_id}</td>
                    <td>{item.emp_name}</td>
                    <td>{item.emp_nik}</td>
                    <td>{item.thp_no}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer summary={summary} />
    </div>
  );
}

export default App;
