"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import personalDetails, {
  setpersonalDetails,
} from "@/redux/slices/personalDetails";
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from "next/navigation";

const { Option } = Select;

const PersonalInformation = ({ tab, setTab }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = useForm(); 
  
  const Details = useSelector((state) => state.personalDetails) || {};


  useEffect(() => {
    if (Details) {
      form.setFieldsValue(personalDetails);
    }
  }, [Details, form]);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(setpersonalDetails(values));
    localStorage.setItem("formData", JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 100; // Specify the maximum width here
        const maxHeight = 100; // Specify the maximum height here
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  return (
    <div className="flex items-start justify-start w-full gap-9 px-9 py-6">
      {/* "Choose an image" section */}
      <div className="image-upload-container flex justify-center items-center ">
        <div
          className="flex flex-col justify-center items-center"
          style={{ border: "2px dashed gray ", padding: "12px" }}
        >
          <label
            htmlFor="image-upload-input"
            className="image-upload-label text-center"
          >
            {image ? image.name : "Choose an image"}
          </label>
          <div
            className="flex justify-center items-center  "
            htmlFor="image-upload-input"
            style={{ cursor: "pointer" }}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="upload image"
                className="img-display-after image-upload-label"
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={60}
                  height={60}
                  style={{
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                  viewBox="0 0 512 512"
                >
                  <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                </svg>
              </div>
            )}
            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <Form
        className="w-full"
        name="basic"
        labelCol={
          {
            // span: 10,
          }
        }
        wrapperCol={
          {
            // span: 18,
          }
        }
        style={{}}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row className="w-full " gutter={0}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="First Name"
              rules={[
                {
                  pattern: /^[A-Za-z]+$/,
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <Form.Item
            label="Email Address"
            name="Email Address"
            // style={{width:600}}
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

                message: "Please input your Email Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Work Email"
            name="Work Email"
            rules={[
              {
                required: true,
                message: "Please input your Work Email Address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Row gutter={0}>
          <Col span={12}>
            <Form.Item
              label="Employee ID"
              name="Employee ID"
              rules={[
                {
                  required: true,
                  pattern: /^[A-Za-z0-9]{6,}$/,
                  message: "Please input your Employee ID!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="w-1/2 gap-4">
            <Form.Item
              label="Gender"
              name="Gender"
              style={{ marginBottom: 0, marginLeft: "5px" }}
            >
              <Radio.Group
                style={{ display: "flex", flexDirection: "row" }}
                className="justify-center gap-4"
              >
                <Radio.Button className="w-full" value="small">
                  Male
                </Radio.Button>
                <Radio.Button className="w-full" value="default">
                  Female
                </Radio.Button>
                <Radio.Button className="w-full" value="large">
                  Other
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>{" "}
        <Row gutter={0}>
          <Col span={12}>
            <Form.Item
              label="Contact no"
              name="Contact no"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please input you Contact no!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Emergency Contact no"
              name="Emergency Contact no"
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Please input your Emergency Contact no!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={12}>
            <Form.Item
              label="Address line 1"
              name="Address line 1"
              rules={[
                {
                  required: true,
                  message: "Please input you Address line 1!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address line 2"
              name="Address line 2"
              rules={[
                {
                  required: true,
                  message: "Please input your Address line 2!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={12}>
            <Form.Item
              label="Landmark"
              name="Landmark"
              rules={[
                {
                  required: true,
                  message: "Please input your Landmark!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="Country"
              rules={[
                {
                  required: true,
                  message: "Please input your Country!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col span={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please select an option!",
                },
              ]}
            >
              <Select placeholder="Please select">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Col span={12}>
          <Form.Item
            label="Zip Code"
            name="Zip Code"
            rules={[
              {
                pattern: /^\d{5}-\d{4}$/,
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Form.Item
          wrapperCol={
            {
              // offset: 2,
            }
          }
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "blue",
            // flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => {
              setTab(tab+1)
            }}
              // router.push("/employees/addemp/profdetails");
            block
            // htmlType="submit"
            type="primary"
            style={{
              width: "30vw",
              color: "white",
              backgroundColor: "#1890FF",
              height: "100%",
              borderRadius: "5px",
            }}
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
