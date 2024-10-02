import React from "react";
import {
  Datagrid,
  List,
  EditButton,
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  Create,
  useNotify,
  useRedirect,
  required,
  DeleteButton,
  NumberField,
  NumberInput,
} from "react-admin";

export const KonkursiList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField label="Ime" source="name" />
        <TextField label="Opis" source="description" />
        <TextField label="Link" source="url" width="20%" />
        <TextField
          label="Link slike"
          source="picture"
          style={{
            display: "block",
            width: "100px" /* Set the width of the input field */,
            whiteSpace:
              "nowrap" /* Prevent text from wrapping to the next line */,
            overflow: "hidden" /* Hide the overflowed text */,
            textOverflow: "ellipsis",
          }}
        />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton
          width="10%"
          label="Obriši"
          basePath="/konkursi"
          resource="konkursi"
          redirect={false}
        />
      </Datagrid>
    </List>
  );
};

export const KonkursiEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput multiline source="name" label="Ime" fullWidth />
        <TextInput multiline source="description" label="Opis" fullWidth />
        <TextInput multiline source="url" label="Link" fullWidth />
        <TextInput multiline source="imageURL" label="Link slike" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export const KonkursiCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    notify(`Konkurs uspješno kreiran!`);
    redirect(`/konkursi`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="name"
          label="Ime"
          validate={[required()]}
          multiline
          fullWidth
        />
        <TextInput
          source="link"
          label="Link"
          validate={[required()]}
          multiline
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
};

/* export const FitnessList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField label="Ime" source="name" />
        <TextField label="Link" source="link" />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton
          width="10%"
          label="Obriši"
          basePath="/fizicka_sprema"
          resource="fizicka_sprema"
          redirect={false}
        />
      </Datagrid>
    </List>
  );
};

export const FitnessEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput multiline source="name" label="Ime" fullWidth />
        <TextInput multiline source="link" label="Link" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

export const FitnessCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    notify(`Fizicka sprema uspješno kreirana!`);
    redirect(`/fizicka_sprema`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="name"
          label="Ime"
          validate={[required()]}
          multiline
          fullWidth
        />
        <TextInput
          source="link"
          label="Link"
          validate={[required()]}
          multiline
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
};
 */
export const MealList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField label="Dan" source="day" width="30%" />
        <TextField label="Plan" source="plan" width="30%" />
        <NumberField label="Redni broj" source="order" width="30%" />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton
          width="10%"
          label="Obriši"
          basePath="/plan_ishrane"
          resource="plan_ishrane"
          redirect={false}
        />
      </Datagrid>
    </List>
  );
};

export const MealEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput multiline source="day" label="Dan" fullWidth />
        <TextInput multiline source="plan" label="Plan" fullWidth />
        <NumberInput label="Redni broj" source="order" width="30%" />
      </SimpleForm>
    </Edit>
  );
};

export const MealCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    notify(`Plan ishrane uspješno kreirana!`);
    redirect(`/plan_ishrane`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="day"
          label="Dan"
          validate={[required()]}
          multiline
          fullWidth
        />
        <TextInput
          source="plan"
          label="Plan"
          validate={[required()]}
          multiline
          fullWidth
        />
        <NumberInput
          label="Redni broj"
          source="order"
          width="30%"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
export const TrainingList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField label="Plan" source="plan" width="30%" />
        <NumberField label="Redni broj" source="order" width="30%" />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton
          width="10%"
          label="Obriši"
          basePath="/treniranje"
          resource="treniranje"
          redirect={false}
        />
      </Datagrid>
    </List>
  );
};

export const TrainingEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput multiline source="link" label="Link" fullWidth />
        <TextInput multiline source="plan" label="Plan" fullWidth />
        <NumberInput label="Redni broj" source="order" width="30%" />
      </SimpleForm>
    </Edit>
  );
};

export const TrainingCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const onSuccess = (data) => {
    notify(`Trening uspješno kreiran!`);
    redirect(`/treniranje`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput
          source="link"
          label="Link"
          validate={[required()]}
          multiline
          fullWidth
        />
        <TextInput
          source="plan"
          label="Plan"
          validate={[required()]}
          multiline
          fullWidth
        />
        <NumberInput
          label="Redni broj"
          source="order"
          width="30%"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};
