import React from "react";
import {
  Datagrid,
  List,
  Filter,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  DatagridBody,
  Create,
  Edit,
  SimpleForm,
  required,
  useNotify,
  useRedirect,
  BooleanInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  useGetList,
  AutocompleteArrayInput,
  NumberInput,
} from "react-admin";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const CustomDatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
}) => {
  return (
    <TableRow key={id}>
      <TableCell style={{ width: "50%" }} padding="none">
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

const CategoriesFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Pretraga" source="name" alwaysOn />
  </Filter>
);

export const CategoriesList = (props) => (
  <List {...props} filters={<CategoriesFilter />}>
    <Datagrid rowClick="edit">
      <TextField width="80%" label="Naziv" source="name" />
      <TextField width="20%" label="Poredak" source="order" />
      <EditButton width="10%" label="Uredi" />
      <DeleteButton width="10%" label="Obriši" redirect={false} />
    </Datagrid>
  </List>
);

export const CategoriesEdit = (props) => {
  const subctg = useGetList("subcategories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          source="name"
          label="Naziv kategorije"
          validate={[required()]}
          fullWidth
        />
        {!subctg.isLoading && (
          <AutocompleteArrayInput
            label="Potkategorije"
            source="subcategories"
            choices={subctg.data}
            fullWidth
          />
        )}
        <NumberInput source="price" label="Cijena" fullWidth />
        <NumberInput source="order" label="Poredak" fullWidth />
        <BooleanInput
          label="Ima podkategorija (za policajca ili inspektora)"
          source="hasSubcategory"
        />
        <BooleanInput
          label="Ima super potkategorija (činovi)"
          source="isSuperSubcategory"
        />
        <BooleanInput label="Drzavni" source="isDrzavni" />
        <TextInput multiline label="Zakon" source="law" fullWidth />
        <TextInput multiline label="URL slike" source="imageURL" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export const CategoriesCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const subctg = useGetList("subcategories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });
  const onSuccess = (data) => {
    notify(`Kategorija uspješno kreirana!`);
    redirect(`/categories`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="name"
          label="Naziv kategorije"
          validate={[required()]}
          fullWidth
        />
        {!subctg.isLoading && (
          <AutocompleteArrayInput
            label="Potkategorije"
            source="subcategories"
            choices={subctg.data}
            fullWidth
          />
        )}
        <NumberInput source="order" label="Poredak" fullWidth />
        <BooleanInput
          label="Ima podkategorija (za policajca ili inspektora)"
          source="hasSubcategory"
        />
        <BooleanInput
          label="Ima super potkategorija (činovi)"
          source="isSuperSubcategory"
        />
        <BooleanInput label="Drzavni" source="isDrzavni" />

        <TextInput multiline label="Zakon" source="law" fullWidth />
        <TextInput multiline label="URL slike" source="imageURL" fullWidth />
      </SimpleForm>
    </Create>
  );
};
