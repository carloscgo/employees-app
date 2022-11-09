import { useState, useContext, useRef } from "react";
import { Form as BForm, Button, FloatingLabel, Row, Col, Card, Image } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message/dist';
import truncate from 'lodash/truncate';

import Context from '../../utils/context';
import { TITLE_PAGES, routes } from '../../utils/constants';

import {
  PropsEmployee,
  IFunc,
} from '../../utils/interfaces';
import {
  newID
} from '../../utils/services';

import Container from './styles';

const GENDERS = [{
  value: 'male',
  label: 'Male'
}, {
  value: 'female',
  label: 'Female'
}]

const GENDER_STYLES = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid var(--bs-gray-300)",
    color: state.isSelected ? "white" : "blue",
    padding: 10,
    width: "100%"
  }),
  control: () => ({
    width: 200,
    display: "flex"
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};

const Form = () => {
  const [selectedGender, setSelectedGender] = useState({});
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { employees, onSave } = useContext(Context) as {
    employees: Array<PropsEmployee>,
    onSave: IFunc,
  };

  const single = {}

  const {
    register,
    errors,
    setValue,
    trigger,
    getValues,
    formState: { isValid }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: single || {}
  })

  const error = (name: string) => errors && (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }: { message: string }) => (
        <BForm.Text id={`helpBlock-${name}`} muted>
          {message}
        </BForm.Text>
      )}
    />
  )

  const onSubmit = () => {
    if (!isValid) return

    const data = getValues()

    /*onSave({
      id: newID(),
      genre: data.category,
      img: data.image,
      title: data.title,
      date: data.date,
      description: data.description
    })*/
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">{TITLE_PAGES.single}</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive p-4">
              <Row className="g-2">
                <Col md={6} sm={12} lg={4}>
                  <FloatingLabel label="Firstname" className="mb-3" controlId="formFirstname">
                    <BForm.Control type="text" name='firstName' maxLength={50} {...register('firstName', {
                      required: true
                    })}
                      onChange={() => trigger()}
                    />
                  </FloatingLabel>

                  {error('firstName')}
                </Col>
                <Col md={6} sm={12} lg={4}>
                  <FloatingLabel label="Lastname" className="mb-3" controlId="formLastname">
                    <BForm.Control type="text" name='lastName' maxLength={50} {...register('lastName', {
                      required: true
                    })}
                      onChange={() => trigger()}
                    />
                  </FloatingLabel>

                  {error('lastName')}
                </Col>
                <Col md={6} sm={12} lg={4}>
                  <FloatingLabel label="Age" className="mb-3" controlId="formAge">
                    <BForm.Control type="number" min="15" max="70" name='age' maxLength={50} {...register('age', {
                      required: true
                    })}
                      onChange={() => trigger()}
                    />
                  </FloatingLabel>

                  {error('age')}
                </Col>
                <Col md={6} sm={12} lg={4}>
                  <FloatingLabel label="Gender" className="mb-3" controlId="formGender">
                    <Select
                      defaultValue={selectedGender}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        setSelectedGender(e)

                        setValue('gender', e.value)

                        trigger()
                      }}
                      name="gender"
                      className="form-control select"
                      options={GENDERS}
                      styles={GENDER_STYLES}
                      required={true}
                    />
                  </FloatingLabel>

                  {error('gender')}
                </Col>
                <Col md={6} sm={12} lg={4}>
                  <FloatingLabel label="Imagen" className="mb-3" controlId="formImage">
                    <BForm.Control as="div" type="text" ref={inputRef} onClick={() => fileRef?.current?.click()}>Choice a image</BForm.Control>

                    <BForm.Control className="d-none" ref={fileRef} type="file" name="image" accept="image/*"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e: any) => {
                        const image = e.target.files[0];
                        const reader = new FileReader();

                        inputRef.current.innerHTML = truncate(image.name, { length: 20 })
                        inputRef.current.title = image.name

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        reader.onload = function (upload: any) {
                          setValue('image', upload.target.result)

                          trigger()
                        };
                        reader.readAsDataURL(image);
                      }}
                    />
                  </FloatingLabel>

                  {error('image')}
                </Col>
                <Col md={6} sm={12} lg={4}>
                  {getValues().image && <Image className="avatar" title={inputRef.current.title} roundedCircle thumbnail src={getValues().image} />}
                </Col>
              </Row>

              <Row className="g-2 my-4">
                <Col className="d-flex justify-content-center">
                  <Button variant="secondary" type="submit" disabled={!isValid} onClick={() => onSubmit()}>
                    <i className="bi bi-save-fill"></i> Save
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Form;