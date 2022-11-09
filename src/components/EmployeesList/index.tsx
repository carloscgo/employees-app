/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react"
import { Table, Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Context from '../../utils/context';
import { TITLE_PAGES, routes } from '../../utils/constants';
import {
  PropsEmployee, Paginate, IFunc
} from '../../utils/interfaces';

import { ROWS, Props } from './contants'
import Container from './styles'

const EmployeesList = () => {
  const { employees, paginate, onLoad } = useContext(Context) as { employees: Array<PropsEmployee>, paginate: Paginate, onLoad: IFunc };

  const canLoad = useMemo(() => (paginate.limit + paginate.skip) < paginate.total, [paginate])

  const getValue = (item: any, prop: any) => item[prop]

  const routeDetails = routes.find((route) => route.slug === 'employee')

  const mapId = (item: any) => routeDetails?.path.replace(':id', item.id)

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">{TITLE_PAGES.employees}</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    {ROWS.map((row) => (
                      <th key={row.prop} className="border-0">{row.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item: PropsEmployee) => (
                    <tr key={item.id}>
                      {ROWS.map((row: Props) => (
                        <td key={`${row.prop}-${item.id}`}>
                          {row.prop === 'image' ? <Image className="avatar" roundedCircle thumbnail src={getValue(item, row.prop)} /> : getValue(item, row.prop)}
                          {row.prop === 'action' && (
                            <Button className="btn-link" onClick={() => mapId(item.id)}>
                              <i className="bu bi-trash-fill text-danger"></i>
                            </Button>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>

              {canLoad && (
                <div className="d-flex align-items-center justify-content-center m-5">
                  <Button onClick={() => onLoad()}>
                    Load More
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeesList;
