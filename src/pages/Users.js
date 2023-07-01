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
  AutocompleteArrayInput,
  required,
  DateInput,
  DateTimeInput,
} from "react-admin";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Switch } from "@material-ui/core";

import { useGetList } from "react-admin";

const CategoriesField = ({ record }) => {
  const { data: categories, isLoading } = useGetList(
    "categories", // Name of the categories resource
    { page: 1, perPage: 1000 }, // Adjust the pagination options as needed
    { field: "id", order: "ASC" }, // Sort the categories by ID in ascending order
    {}
  );
  console.log(!isLoading || !record || !record.paymentDetails);
  if (isLoading || !record || !record.paymentDetails) {
    return null;
  }

  const categoryIds = record.paymentDetails.categories;

  const categoryNames = categoryIds
    .map((categoryId) =>
      categories.find((category) => category.id === categoryId)
    )
    .filter((category) => category)
    .map((category) => category.name);

  return <span>{categoryNames.join(", ")}</span>;
};

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

        <CategoriesField source="paymentDetails" label="Kategorije" />
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
  const { data, total, isLoading, error } = useGetList("categories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput label="Premium korisnik" source="isPremium" />
        <Grid item xs={4}>
          <DateTimeInput
            validate={[required()]}
            source="paymentDetails.createdAt"
            label="Važi od"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          {!isLoading && (
            <AutocompleteArrayInput
              label="Kategorije"
              source="paymentDetails.categories"
              choices={data}
            />
          )}
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
