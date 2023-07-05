import React from "react";
import {
  Datagrid,
  List,
  EditButton,
  Edit,
  SimpleForm,
  NumberField,
  NumberInput,
  TextField,
} from "react-admin";

export const SettingsList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <NumberField width="10%" label="Cijena MUP-a" source="mupPrice" />
        <NumberField
          width="10%"
          label="Cijena svih kategorija"
          source="price"
        />

        <EditButton width="10%" label="Uredi" />
      </Datagrid>
    </List>
  );
};

export const SettingsEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput width="80%" label="Cijena MUP-a" source="mupPrice" />
        <NumberInput
          width="80%"
          label="Cijena svih kategorija"
          source="price"
        />
      </SimpleForm>
    </Edit>
  );
};
