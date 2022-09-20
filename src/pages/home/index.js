import React from "react";
import { IllustasiDashboard } from "../../assets";
import ChartCard from "../../components/dashboard/ChartCard";
import { trafficShares } from "../../data/charts";

const Home = () => {
  return (
    <div className="dashboard">
      <div className="container-fluid m-0 p-0">
        <div className="field-dashboard">
          <div className="box-welcome mb-3">
            <div className="row ">
              <div className="col-md-8">
                <div className="left-content">
                  <h3 className="text-white">
                    Welcome to web dashboard, Renaldi. 👋
                  </h3>
                  <p>Here is what’s happening with your projects today</p>
                  <button className="glass-button">Get Started</button>
                </div>
              </div>
              <div
                className="col-md-4 d-flex justify-content-end"
                style={{ minHeight: "300px" }}
              >
                <div className="right-content">
                  <img src={IllustasiDashboard} className="w-100"></img>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 mb-4">
              <ChartCard title="Traffic Share" data={trafficShares} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
