import React from "react";
import {
  Datagrid,
  List,
  Filter,
  TextField,
  TextInput,
  BooleanField,
  DateField,
  DatagridBody,
  BooleanInput,
  Edit,
  SimpleForm,
  EditButton,
} from "react-admin";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useUpdate, useNotify, useRefresh } from "react-admin";
import { FirebaseDataProvider } from "react-admin-firebase";
import { Switch } from "@material-ui/core";
const CustomDatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
}) => {
  record = {
    ...record,
    firstName: record.firstName === null ? "//" : record.firstName,
    lastName: record.lastName === null ? "//" : record.lastName,
    email: record.email === null ? "//" : record.email,
    createdAt: record.createdAt === null ? "//" : record.createdAt,
  };
  return (
    <TableRow key={id}>
      <TableCell style={{ width: "10%" }} padding="none">
        {record.selectable && (
          <Checkbox checked={selected} onClick={() => onToggleItem(id)} />
        )}
      </TableCell>
      {React.Children.map(children, (field) => (
        <TableCell
          style={{ width: field.props.width }}
          key={`${id}-${field.props.source}`}
        >
          {React.cloneElement(field, {
            record,
            basePath,
            resource,
          })}
        </TableCell>
      ))}
    </TableRow>
  );
};

const CustomDatagridBody = (props) => (
  <DatagridBody {...props} row={<CustomDatagridRow />} />
);
const CustomDatagrid = (props) => (
  <Datagrid {...props} body={<CustomDatagridBody />} />
);

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Pretraga" source="lastName" alwaysOn />
  </Filter>
);

export const UserList = (props) => {
  return (
    <List {...props} filters={<UserFilter />}>
      <CustomDatagrid rowClick="edit">
        <TextField width="20%" source="firstName" label="Ime" />
        <TextField width="20%" source="lastName" label="Prezime" />
        <TextField width="20%" source="email" label="E-mail" />
        <BooleanField source="isPremium" label="Premium član" />
        <DateField
          source="createdAt"
          label="Datum registracije"
          locales="hr-HR"
        />
        <EditButton width="10%" label="Uredi" />
      </CustomDatagrid>
    </List>
  );
};
export const EditUserList = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput label="Premium korisnik" source="isPremium" />
      </SimpleForm>
    </Edit>
  );
};
