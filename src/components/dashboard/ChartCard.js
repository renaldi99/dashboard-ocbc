import React from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import Chartist from "react-chartist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: (value) =>
      `${Math.round((value / series.reduce(sum)) * 100)}%`,
  };

  const plugins = [ChartistTooltip];

  return (
    <Chartist
      data={{ series }}
      options={{ ...options, plugins }}
      type="Pie"
      className="ct-golden-section"
    />
  );
};

const ChartCard = (props) => {
  const { title, data = [] } = props;
  const series = data.map((d) => d.value);

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xs={12}
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <CircleChart series={series} />
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <h5 className="mb-3">{title}</h5>

            {data.map((d) => (
              <h6
                key={`circle-element-${d.id}`}
                className="fw-normal text-gray"
              >
                <FontAwesomeIcon
                  icon={d.icon}
                  className={`icon icon-xs text-${d.color} w-20 me-1`}
                />
                {` ${d.label} `}
                {`${d.value}%`}
              </h6>
            ))}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ChartCard;
