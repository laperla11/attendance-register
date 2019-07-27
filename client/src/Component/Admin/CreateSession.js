import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function CreateSession(props) {
  const { handleSubmit, handleChange, name, city, date, session } = props;
  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)}>
        <FormGroup row>
          {/* <Label for="eFormControlInput1" sm={2}>Date</Label> */}
          <Col>
            <Input
              type="text"
              value={date}
              name="date"
              placeholder="DD/MM/YYYY"
              className="input form-control"
              onChange={e => handleChange(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          {/* <Label for="eFormControlInput1" sm={2}>Module</Label> */}
          <Col>
            <Input
              type="text"
              value={name}
              name="name"
              placeholder="ReactJS"
              className="input form-control"
              onChange={e => handleChange(e)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          {/* <Label for="eFormControlInput1" sm={2}>Session</Label> */}
          <Col >
            <Input
              type="text"
              value={session}
              name="session"
              placeholder="Session"
              className="input form-control"
              onChange={e => handleChange(e)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          {/* <Label for="eFormControlInput1" sm={2}>City</Label> */}
          <Col>
            <Input
              type="text"
              value={city}
              name="city"
              placeholder="City"
              className="input form-control"
              onChange={e => handleChange(e)}
            />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit" className="submitBtn">Submit</Button>
          </Col>
        </FormGroup>


      </Form>

    </div>
  );
}
