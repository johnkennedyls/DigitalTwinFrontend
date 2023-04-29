import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, Checkbox , FormControl , OutlinedInput,List, ListItem   } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Autocomplete from '@mui/material/Autocomplete';
import AlarmService from '../../services/AlarmService';

function AddAlarm() {
  const [valor, setValor] = useState('');
  const [tags, setTags] = useState([]);
  const [events, setEvents] = useState([]);
  const [emails, setEmails] = useState([]);
  const [conditional, setConditional] = useState('');


  const [selectedValue, setSelectedValue] = useState("");
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChange = (event) => {
    setOperador(event.target.value);
    if (event.target.value === "Rango") {
      setValor("");
    }
  };

  //Metodo para obtener la lista de tags
  useEffect(() => {
    async function getTags() {
      const tags = await AlarmService.getAlarms();
      setTags(tags);
    }
    getTags();
  }, []);

    //Metodo para obtener la lista de eventos
    useEffect(() => {
      async function getEvents() {
        const events = await AlarmService.getEvents();
        setEvents(events);
      }
      getEvents();
    }, []);

      //Metodo para obtener la lista de emails
  useEffect(() => {
    async function getEmails() {
      const emails = await AlarmService.getEmails();
      setEmails
      
      (emails);
    }
    getEmails();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '200px', marginBottom: '20px' }}>
  <TextField
    label="Nombre"
    value={valor}
    style={{ marginRight: '10px', marginBottom: '20px' }}
  />
  <TextField
    label="Descripción"
    value={valor}
    multiline
    rows={4}
    style={{ marginRight: '10px', height: '80px',marginBottom: '70px' }}
  />
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Select
                      labelId="listTags"
                      id="listTags"
                      label="Tag"
                      
                    >
                      {tags.map((tag) => (
                        <MenuItem
                          key={tag.instId}
                          label={selectedValue ? selectedValue : "tag"}
                          value={tag.tagid}
                        >
                          {tag.tagName}
                        </MenuItem>
                      ))}
                    </Select>
      <FormControl style={{ marginLeft: '10px' }}>
        <Select
          value={conditional}
          onChange={handleChange}
        >
          <MenuItem value="<">&lt;</MenuItem>
          <MenuItem value=">=">&gt;=</MenuItem>
          <MenuItem value=">">&gt;</MenuItem>
          <MenuItem value="<=">&lt;=</MenuItem>
          <MenuItem value="=">=</MenuItem>
          <MenuItem value="Rango">Rango</MenuItem>
        </Select>
      </FormControl>
      {conditional === "Rango" && (
        <>
          <TextField
            label="Valor"
            value={valor}
            style={{ marginLeft: '20px' }}
          />
          <span style={{ marginLeft: '10px', marginRight: '10px' }}>-</span>
          <TextField
            label="Valor"
            value={valor}
          />
        </>
      )}
      {conditional !== "Rango" && (
        <TextField
          label="Valor"
          value={valor}
          style={{ marginLeft: '20px' }}
        />
      )}

    </div>
    <Select
                      labelId="listEvents"
                      id="listEvents"
                      label="Institucion"
                      
                    >
                      {events.map((event) => (
                        <MenuItem
                          key={event.instId}
                          label={selectedValue ? selectedValue : "tag"}
                          value={event.instId}
                          style={{ marginRight: '10px', marginTop: '40px' }}
                        >
                          {event.instName}
                        </MenuItem>
                      ))}
                    </Select>

                    <div>
                    <Autocomplete
      multiple
      id="listEmails"
      options={emails}
      disableCloseOnSelect
      getOptionLabel={(option) => option.emails.email}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Emails" />
      )}
    />
    </div>  
                    </div>
    </>
  );
}

export default AddAlarm
