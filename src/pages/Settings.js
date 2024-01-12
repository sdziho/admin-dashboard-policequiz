import { Typography } from "@material-ui/core";
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
  TextInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

export const SettingsList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <Typography
          label="Uslovi korištenja"
          source="termsOfConditions"
          component="div"
          variant="body1"
          style={{
            maxWidth: "400px", // Adjust this value according to your layout
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2, // Limit to 2 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          <TextField source="termsOfConditions" label="Uslovi korištenja" />
        </Typography>
        <TextField label="Blokirane verzije" source="deprecatedVersions" />
        <NumberField width="10%" label="Cijena 30 dana" source="price30" />
        <NumberField width="10%" label="Cijena 60 dana" source="price60" />
        <NumberField width="10%" label="Cijena 90 dana" source="price90" />

        <EditButton width="10%" label="Uredi" />
      </Datagrid>
    </List>
  );
};

export const SettingsEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          multiline
          source="termsOfConditions"
          label="Uslovi korištenja"
          fullWidth
        />
        <ArrayInput
          source="deprecatedVersions"
          label="Popis blokiranih verzija"
        >
          <SimpleFormIterator>
            <TextInput source="" label="Verzija" />
          </SimpleFormIterator>
        </ArrayInput>
        <NumberInput width="10%" label="Cijena 30 dana" source="price30" />
        <NumberInput width="10%" label="Cijena 60 dana" source="price60" />
        <NumberInput width="10%" label="Cijena 90 dana" source="price90" />
        <ArrayInput source="images" label="Popis linkova slika">
          <SimpleFormIterator>
            <TextInput source="" label="Link" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput multiline source="esej" label="Esej" fullWidth />
        <TextInput source="spremaURL" label="Slika fizicke spreme" fullWidth />
        <TextInput source="ishranaURL" label="Slika plana ishrane" fullWidth />
        <TextInput source="esejURL" label="Slika eseja" fullWidth />
        <TextInput source="treniranjeURL" label="Slika treniranja" fullWidth />
        <TextInput source="premiumURL" label="Slika plaćanja" fullWidth />
      </SimpleForm>
    </Edit>
  );
};
