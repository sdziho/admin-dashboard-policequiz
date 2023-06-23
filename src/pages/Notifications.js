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
  useGetList,
  DateTimeInput,
  DateField,
  AutocompleteInput,
} from "react-admin";

export const NotificationsList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField width="80%" label="Naziv" source="message" />
        <DateField
          source="startingAt"
          label="Datum registracije"
          locales="hr-HR"
        />
        <DateField
          source="endingAt"
          label="Datum registracije"
          locales="hr-HR"
        />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton
          width="10%"
          label="Obriši"
          basePath="/notifications"
          resource="notifications"
          redirect={false}
        />
      </Datagrid>
    </List>
  );
};

export const NotificationsEdit = (props) => {
  const ctg = useGetList("categories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          source="message"
          label="Poruka obavještenja"
          validate={[required()]}
          fullWidth
        />
        {!ctg.isLoading && (
          <AutocompleteInput
            validate={[required()]}
            label="Kategorije"
            source="category"
            choices={ctg.data}
          />
        )}
        <DateTimeInput source="startingAt" label="Datum početka" fullWidth />
        <DateTimeInput source="endingAt" label="Datum kraja" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export const NotificationsCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const ctg = useGetList("categories", {
    sort: { field: "createdAt", order: "DESC" },
  });
  const onSuccess = (data) => {
    notify(`Kategorija uspješno kreirana!`);
    redirect(`/notifications`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="message"
          label="Poruka obavještenja"
          validate={[required()]}
          fullWidth
        />
        {!ctg.isLoading && (
          <AutocompleteInput
            validate={[required()]}
            label="Kategorije"
            source="category"
            choices={ctg.data}
            fullWidth
          />
        )}
        <DateTimeInput source="startingAt" label="Datum početka" fullWidth />
        <DateTimeInput source="endingAt" label="Datum kraja" fullWidth />
      </SimpleForm>
    </Create>
  );
};
