import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./style.css";
import fileLock from "../assets/filelock.png";
import imgfile from "../assets/file.png";
import img from "../assets/unkown2.png";
import { ReactComponent as Logo } from "../Logo.svg";
import { ReactComponent as Caret } from "../assets/CaretDown.svg";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import reject from "../assets/reject.png";
import tru from "../assets/true.png";

const TablePage = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  const formattedDate = today.toLocaleDateString("ru-RU", options);

  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const { email } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/table");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [isSelected, setIsSelected] = useState(false);

  // Для выборки всех чек боксов есть баги №
  const selectAll = () => {
    setTableData((prevTableData) =>
      prevTableData.map((row) => ({ ...row, selected: true }))
    );
    setIsSelected(true);
  };

  // Для выборки всех чек боксов есть баги №
  const diSelect = () => {
    setTableData((prevTableData) =>
      prevTableData.map((row) => ({ ...row, selected: false }))
    );
    setIsSelected(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            marginTop: "10px",
            marginLeft: "5%",
          }}
        >
          <Logo />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{}}>
            <FontAwesomeIcon
              icon={faBell}
              style={{ width: "20px", height: "20px", color: "#4b7bf5" }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <img
              src={img}
              alt="unk"
              style={{ width: "80px", height: "55px", borderRadius: "50%" }}
            />
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {email}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "90px",
            }}
          >
            <Caret />
          </div>
        </div>
      </div>
      <h1 style={{ marginLeft: "5%", marginTop: "55px", marginBottom: "3px" }}>
        Совершение исполнительной надписи
      </h1>
      <div className="search-bar">
        <div className="search-input-container">
          <input type="text" className="search-input" placeholder="Search..." />
        </div>

        <div
          style={{
            marginLeft: "25%",
            marginBottom: "3%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={imgfile}
            alt="file"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "20%",
              marginRight: "3px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <text
              style={{
                marginLeft: "10px",
                width: "145 px",
                height: "17 px",
                fontFamily: "-moz-initial",
                marginRight: "60px",
                // flexWrap:"wrap"
              }}
            >
              Исполнит надписей
            </text>
            <text style={{ fontSize: "50", marginLeft: "10px" }}>30</text>
          </div>

          <img
            src={fileLock}
            alt="file"
            style={{ width: "45px", height: "45px", borderRadius: "20%" }}
          />
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <text
                style={{
                  marginLeft: "10px",
                  width: "128 px",
                  height: "17 px",
                  fontFamily: "-moz-initial",
                  // flexWrap:"wrap"
                }}
              >
                Не подписаны ЭЦП
              </text>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <text
                  style={{
                    fontSize: "50",
                    marginLeft: "10px",
                    height: "38px",
                    width: "31px",
                  }}
                >
                  30
                </text>
                <div
                  style={{
                    display: "flex",
                    width: "21px",
                    height: "10px",
                    padding: "4px 8px 5px 10px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(75, 123, 245, 1)",

                    marginTop: "3px",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      height: "12px",
                      width: "10px",
                      marginTop: "-3px",
                      marginLeft: "-5px",
                    }}
                  >
                    20%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginLeft: "5%", fontSize: 24, fontWeight: 700 }}>
          {formattedDate}
        </p>
        <button
          className="my-button"
          onClick={diSelect}
          style={{ marginLeft: "auto" }}
        >
          Отменить выделение
        </button>
        <button className="my-button" onClick={selectAll}>
          Выделить все
        </button>
        <button className="my2-button">
          Направить на исполнительную надпись
        </button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>№</th>
              <th>ЛС</th>
              <th>ИИН</th>
              <th>Месяц образования задолженности</th>
              <th>Сумма</th>
              <th>Статус оплаты</th>
              <th>Документы</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "30%",
                    }}
                    checked={isSelected ? row.selected : row.id}
                  />
                </td>
                <td>{row.number}</td>
                <td style={{ color: "#4b7bf5" }}>{row.ls}</td>
                <td style={{ color: "#4b7bf5" }}>{row.jsn}</td>
                <td>{row.debtMonth}</td>
                <td>{row.amount}</td>
                <td>
                  {row.paymentStats ? (
                    <img src={reject} style={{ width: "25px" }} alt="Reject" />
                  ) : (
                    <img src={tru} style={{ width: "35px" }} alt="Unreject" />
                  )}
                </td>
                <td style={{ color: "#4b7bf5" }}>{row.docOpen}</td>
                <td>{row.stats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
