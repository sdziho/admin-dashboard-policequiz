import {
  Datagrid,
  List,
  Filter,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  ReferenceField,
  Edit,
  SimpleForm,
  required,
  ReferenceInput,
  SelectInput,
  ArrayField,
  FormDataConsumer,
  ReferenceArrayField,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  useGetList,
  NumberInput,
  SingleFieldList,
  useNotify,
  useRedirect,
  AutocompleteArrayInput,
  Create,
  useEditController,
  NullableBooleanInput,
  DateField,
} from "react-admin";
import Grid from "@material-ui/core/Grid";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionsFilter = (props) => {
  const { data, total, isLoading, error } = useGetList("subcategories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });
  console.log(data);
  return (
    <Filter {...props}>
      <BooleanInput label="Za policajaca" source="isForPoliceman" alwaysOn />
      <BooleanInput label="Za inspektora" source="isForInspector" alwaysOn />
      <ReferenceInput
        label="Kategorija"
        source="categories"
        reference="categories"
        allowEmpty
      >
        <SelectInput label="Kategorije" optionText="name" />
      </ReferenceInput>
      {!isLoading && (
        <AutocompleteArrayInput
          label="Potkategorije"
          source="subcategories"
          choices={data}
        />
      )}
      <TextInput label="Pitanje" source="question" />
    </Filter>
  );
};

export const QuestionsList = (props) => (
  <List
    {...props}
    sort={{ field: "createdAt", order: "DESC" }}
    filters={<QuestionsFilter />}
  >
    <Datagrid>
      <ReferenceArrayField reference="categories" source="categories">
        <SingleFieldList>
          <TextField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        width="20%"
        reference="subcategories"
        source="subcategories"
      >
        <SingleFieldList>
          <TextField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <DateField
        width="10%"
        source="createdAt"
        label="Napravljeno"
        locales="hr-HR"
        showTime={true}
      />
      <TextField source="question" label="Pitanje" />
      <EditButton width="10%" label="Uredi" />
      <DeleteButton width="10%" label="Obriši" redirect={false} />
    </Datagrid>
  </List>
);

export const QuestionsEdit = (props) => {
  const { data, total, isLoading, error } = useGetList("categories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });

  const subctg = useGetList("subcategories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });
  console.log(subctg.data);
  return (
    <Edit {...props}>
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput
              source="question"
              label="Pitanje"
              multiline
              style={{ height: "auto" }}
              validate={[required()]}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            {!isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Kategorije"
                source="categories"
                choices={data}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {!subctg.isLoading && (
              <AutocompleteArrayInput
                label="Potkategorije"
                source="subcategories"
                choices={subctg.data}
              />
            )}
          </Grid>
        </Grid>
        <ArrayInput source="answers" validate={[required()]} label="Odgovori">
          <SimpleFormIterator>
            <TextInput
              label="Odgovor"
              validate={[required()]}
              source="answer"
              fullWidth
            />
            <BooleanInput label="Tačan" source="correctAnswer" />
          </SimpleFormIterator>
        </ArrayInput>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <BooleanInput label="Za inspektora" source="isForInspector" />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput label="Za policajca" source="isForPoliceman" />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

export const QuestionsCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const navigate = useNavigate();
  const location = useLocation();
  const userPrefs = JSON.parse(localStorage.getItem("userPrefs")) ?? {};
  console.log(userPrefs);
  const onSuccess = (data) => {
    localStorage.setItem(
      "userPrefs",
      JSON.stringify({
        categories: data.categories,
        subcategories: data.subcategories,
        isForPoliceman: data.isForPoliceman,
        isForInspector: data.isForInspector,
      })
    );

    notify(`Pitanje uspješno kreirano!`);
    navigate(0, { newlyCreated: true });
  };

  const { data, total, isLoading, error } = useGetList("categories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });
  const subctg = useGetList("subcategories", {
    pagination: { page: 1, perPage: 300 },
    sort: { field: "createdAt", order: "DESC" },
  });

  const validateUserCreation = (values) => {
    const errors = {};

    if (values.answers.length < 2) {
      errors.answers = "Morate unijeti minimalno 2 odgovara";
    }
    if (values.answers.length > 0) {
      let imaBaremJedanTacan = false;
      let imaViseTacnih = false;
      values.answers.forEach((answer, index) => {
        if (answer.answer.length === 0) {
          errors.answers = "Odgovor ne smije biti prazan";
        }
        if (answer.correctAnswer) {
          if (!imaBaremJedanTacan) {
            imaBaremJedanTacan = true;
          } else {
            imaViseTacnih = true;
          }
        }
      });
      if (!imaBaremJedanTacan) {
        errors.answers = "Morate unijeti barem jedan tačan odgovor";
      }
      if (imaViseTacnih) {
        errors.answers = "Samo jedan odgovor može biti tačan";
      }
    }
    if (values.categories.length === 0) {
      errors.categories = "Morate unijeti minimalno 1 kategoriju";
    }
    return errors;
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm validate={validateUserCreation}>
        <TextInput
          source="question"
          label="Pitanje"
          multiline
          style={{ height: "auto" }}
          validate={[required()]}
          fullWidth
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {!isLoading && (
              <AutocompleteArrayInput
                validate={[required()]}
                label="Kategorije"
                source="categories"
                choices={data}
                defaultValue={userPrefs?.categories ?? []}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {!subctg.isLoading && (
              <AutocompleteArrayInput
                label="Potkategorije"
                source="subcategories"
                choices={subctg.data}
                defaultValue={userPrefs?.subcategories ?? []}
              />
            )}
          </Grid>
        </Grid>
        <ArrayInput
          source="answers"
          label="Odgovori"
          defaultValue={[{ correctAnswer: true }]}
        >
          <SimpleFormIterator getItemLabel={(index) => `#${index + 1}`}>
            <TextInput label="Odgovor" source="answer" />
            <BooleanInput label="Tačan" source="correctAnswer" />
          </SimpleFormIterator>
        </ArrayInput>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <BooleanInput
              label="Za inspektora"
              source="isForInspector"
              defaultValue={userPrefs?.isForInspector ?? false}
            />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput
              label="Za policajca"
              source="isForPoliceman"
              defaultValue={userPrefs?.isForPoliceman ?? false}
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
