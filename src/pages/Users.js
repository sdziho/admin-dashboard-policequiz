import React, { useState } from "react";
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
  useNotify,
  useDataProvider,
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

  if (isLoading || !record || !record.paymentDetails) {
    return null;
  }

  const categoryIds = record?.paymentDetails?.categories ?? [];

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
  const [selectAll, setSelectAll] = useState(false);
  const { data, total, isLoading, error } = useGetList("categories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const currentDate = new Date();
  const handleSubmit = async (values) => {
    console.log(values);
    if (selectAll) {
      values.paymentDetails.categories = data.map((category) => category.id);
    }
    try {
      await dataProvider.update("users", {
        id: values.id,
        data: values,
      });
      notify("Form saved successfully");
    } catch (error) {
      notify("Error: Could not save the form", "error");
    }
  };
  return (
    <Edit {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <BooleanInput label="Premium korisnik" source="isPremium" />

        <DateTimeInput
          validate={[required()]}
          source="paymentDetails.createdAt"
          label="Važi od"
          defaultValue={currentDate}
          fullWidth
        />

        {!isLoading && (
          <AutocompleteArrayInput
            label="Kategorije"
            source="paymentDetails.categories"
            choices={data}
            multiline
            style={{ height: "auto" }}
            fullWidth
            disabled={selectAll}
          />
        )}
        <BooleanInput
          label="Sve kategorije"
          source="selectAll"
          value={selectAll}
          onChange={(event) => setSelectAll(event.target.checked)}
        />
      </SimpleForm>
    </Edit>
  );
};
