import FormComponent from "./Components/Form";
import FormTable from "./Components/Table";
import { fetchData } from "./utils";

import { useState, useEffect } from "react";
import { Form } from "antd";

import "./App.css";
import "antd/dist/antd.min.css";
function App() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedVehicleMake, setSelectedVehicleMake] = useState("");
  const [useYear, setUseYear] = useState(false);
  const [modelYear, setModelYear] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchVehicle = async () => {
      const response = await fetchData(
        "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/vehicle%20type?format=json"
      );
      let newArray = [];
      response.Results.forEach((elem) => {
        newArray.push(elem.Name);
      });
      setVehicleTypes(newArray);
    };
    fetchVehicle("");
  }, []);

  useEffect(() => {
    const fetchVehicleMake = async () => {
      const response = await fetchData(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      let filteredVehicleMake = response.Results.filter((elem) => {
        return elem.VehicleTypeName === selectedVehicleType;
      });
      setVehicleMakes(filteredVehicleMake);
    };
    fetchVehicleMake();
  }, [selectedVehicleType]);

  useEffect(() => {
    const handleValidation = async () => {
      let { vehicleType, vehicleMakes, useYear, year } = form.getFieldsValue();
      if (!useYear) {
        if (vehicleType && vehicleMakes?.length > 0 && loading === false) {
          return setSubmitButtonDisabled(false);
        }
      } else if (useYear === true) {
        let response = /[a-zA-Z]/.test(year) === false && year.length === 4;
        if (
          vehicleType &&
          vehicleMakes?.length > 0 &&
          loading === false &&
          response
        ) {
          return setSubmitButtonDisabled(false);
        }
      }
      return setSubmitButtonDisabled(true);
    };
    handleValidation();
  }, [
    form,
    selectedVehicleType,
    selectedVehicleMake,
    loading,
    useYear,
    modelYear,
  ]);

  const handleSearch = async () => {
    let url;
    let arr = [];
    setLoading(true);
    let response = await selectedVehicleMake.map(async (element) => {
      if (useYear) {
        url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${element}/modelyear/${modelYear}/vehicleType/${selectedVehicleType}?format=json`;
      } else {
        url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${element}/vehicleType/${selectedVehicleType}?format=json`;
      }
      let response = await fetchData(url);
      return response;
    });
    Promise.all(response).then((values) => {
      setLoading(false);
      values.forEach((elem) => {
        return elem.Results.forEach((elem) => {
          return arr.push(elem);
        });
      });
      setTableData(arr);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Car Search</h4>
        <FormComponent
          vehicleTypes={vehicleTypes}
          setSelectedVehicleType={setSelectedVehicleType}
          vehicleMakes={vehicleMakes}
          setSelectedVehicleMake={setSelectedVehicleMake}
          setUseYear={setUseYear}
          useYear={useYear}
          setModelYear={setModelYear}
          submitButtonDisabled={submitButtonDisabled}
          handleSearch={handleSearch}
          loading={loading}
          form={form}
        />
        <FormTable tableData={tableData} />
      </header>
    </div>
  );
}

export default App;
