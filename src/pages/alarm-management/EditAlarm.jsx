/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';


const EditAlarm = () => {


  const addAlarmPath = "/add-alarm"
  const editAlarmPath = "/edit-alarm"

  const columns = [
    {
      title: "Nombre",
      field: "sysName"
    },
    {
        title: "Descripción",
        field: "sysName"
    },
    {
        title: "Tag",
        field: "sysName"
    },
    {
        title: "Condición",
        field: "sysName"
    }
  ];

  return (
    <div className={classes.content}>
     
    </div>
  )
}

export default EditAlarm;