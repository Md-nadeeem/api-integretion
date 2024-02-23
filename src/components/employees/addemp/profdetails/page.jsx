// 
'use client'

// ProfessionalForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfessionalDetails, selectProfessionalDetails, setDropdownOption } from '../../../../redux/slices/profDetails'

import { Form, Input, Button, Select, Col, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { useRouter } from 'next/navigation';
const { Option } = Select;
const numberRegex = /^[0-9]{5,}$/; // Ensure at least 5 digits

const ProfessionalInfo = ({ tab, setTab }) => {
  const dispatch = useDispatch();
  const professionalDetails = useSelector(selectProfessionalDetails);
  const [form] = useForm(); 

  const handleChange = (name, value) => {
    console.log(name,value)
    dispatch(updateProfessionalDetails({ [name]: value }));
  };

  const handleSubmit = () => {
    // Save data to local storage
    console.log("succcess", professionalDetails)
    localStorage.setItem(
      "professionalDetails",
      JSON.stringify(professionalDetails)
    );
    // alert("data stored in local storage");
  };
  const handleSelectChange = (name, value) => {
    dispatch(setDropdownOption({[name]: value}));
};
  const { selectedOption } = useSelector(selectProfessionalDetails);

  const router = useRouter();

  const[ value,setvalue]=useState({})
  const axios = require('axios');
  let data = JSON.stringify({
    "designation": professionalDetails.designation,
    "pf": professionalDetails.pfNumber,
    "uan": professionalDetails.uanNumber,
    "department": professionalDetails.department,
    "reporting_manager_id": professionalDetails.Reporting_Manager,
    "work_location": professionalDetails.Work_Location,
    "start_date": "2024-02-22T12:00:00Z",
    "emp_id": "a070ec06-d2fc-455a-bb03-49e0f8583aa1"
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: 'https://bwppdwpoab.execute-api.us-east-1.amazonaws.com/dev/employee/professionalInfo',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });


  return (
    <Form
      style={{ padding: "20px", margin: "auto", border: "2px solid #eee" }}
      className=" justify-center items-center w-[80%] "
      onFinish={handleSubmit}
    // Adjust the span value based on your layout
    // Adjust the span value based on your layout
    >
      <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: "Please select a designation." }]}
      >
      <Select
          className="rounded-none h-11 font-semibold mb-5  w-[25rem]"
          placeholder="Select Designation"
          value={professionalDetails.designation}
          onChange={(value) => handleChange("designation", value)}
        >
          <Option value="option10">Option 10</Option>
          <Option value="option11">Option 11</Option>
          <Option value="option12">Option 12</Option>
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="PF No"
            name="pfNumber"
            rules={[
              { required: true, message: "Please enter a PF number." },
              {
                pattern: numberRegex,
                message: "Please enter at least 5 digits for PF number.",
              },
            ]}
          >
            <Input
              className="h-11"
              type="text"
              value={professionalDetails.pfNumber}
              onChange={(e) => handleChange("pfNumber", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="UAN No"
            name="uanNumber"
            rules={[
              { required: true, message: "Please enter a UAN number." },
              {
                pattern: numberRegex,
                message: "Please enter at least 5 digits for UAN number.",
              },
            ]}
          >
            <Input
              className="h-11"
              type="text"
              value={professionalDetails.uanNumber}
              onChange={(e) => handleChange("uanNumber", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Department"
        name="Department"
        rules={[{ required: true, message: "Please select a department." }]}
      >
       <Select
            placeholder="Select Department"
            className="rounded-none mb-5 font-semibold h-11"
            value={professionalDetails.department}
            onChange={(value) => handleChange("department", value)}
          >
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Reporting Manager"
        name="Reporting_Manager"
        rules={[
          { required: true, message: "Please select a reporting manager." },
        ]}
      >
       <Select
  placeholder="Select Reporting Manager"
  className="h-11 rounded-none mb-5"
  value={professionalDetails.Reporting_Manager}
  onChange={(value) => handleChange("Reporting_Manager", value)}
>
          <Option value="option4">Option 4</Option>
          <Option value="option5">Option 5</Option>
          <Option value="option6">Option 6</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Work Location"
        name="Work_Location"
        rules={[{ required: true, message: "Please select a work location." }]}
      >
         <Select
    placeholder="Select Work Location"
    className="h-11 rounded-none"
    value={professionalDetails.Work_Location}
    onChange={(value) => handleChange("Work_Location", value)} // Corrected here
  >
          <Option value="option7">Option 7</Option>
          <Option value="option8">Option 8</Option>
          <Option value="option9">Option 9</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => {
            setTab(tab + 1);
          }}
          type="primary"
          htmlType="submit"
          className="rounded-none w-full h-14 bg-blue-600"
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfessionalInfo;