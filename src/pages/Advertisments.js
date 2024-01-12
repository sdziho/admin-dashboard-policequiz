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
  ImageField,
  BooleanInput,
  DateInput,
  ImageInput,
  FileInput,
  FileField,
  Labeled,
  FormDataConsumer,
} from "react-admin";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

const CustomDatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
}) => (
  <TableRow key={id}>
    <TableCell style={{ width: "5%" }} padding="none">
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

const CustomDatagridBody = (props) => (
  <DatagridBody {...props} row={<CustomDatagridRow />} />
);
const CustomDatagrid = (props) => (
  <Datagrid {...props} body={<CustomDatagridBody />} />
);

const AdvertismentsFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Pretraga" source="name" alwaysOn />
  </Filter>
);

export const AdvertismentsList = (props) => {
  return (
    <List {...props} filters={<AdvertismentsFilter />}>
      <CustomDatagrid rowClick="edit">
        <ImageField
          width="30%"
          className="thumbNailView"
          source="imagePermanent.src"
          title="title"
          label="Banner"
        />
        <TextField width="40%" label="Naziv kompanije" source="name" />
        <EditButton width="10%" label="Uredi" />
        <DeleteButton width="10%" label="Obriši" redirect={false} />
      </CustomDatagrid>
    </List>
  );
};

export const AdvertismentsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput
            source="name"
            label="Naziv"
            validate={[required()]}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            source="reddirectUrl"
            label="URL"
            validate={[required()]}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DateInput source="endDate" label="Datum okončanja" fullWidth />
        </Grid>
        <Grid item xs={2}>
          <BooleanInput label="Povremena reklama" source="isQuestionAd" />
        </Grid>
        <Grid item xs={2}>
          <BooleanInput label="Stalna reklama" source="isPermanentAd" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.isQuestionAd && (
                <>
                  <ImageInput
                    source="imageQuestion"
                    label="Logotip"
                    placeholder="Učitajte sliku u omjeru 1:1 (kvadrat)"
                    className="squared_photo"
                    accept="image/*"
                    mulitple={false}
                    multiline={false}
                    {...rest}
                  >
                    <ImageField fullWidth source="src" title="title" />
                  </ImageInput>
                  <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => {
                      if (!formData.imageQuestion) {
                        return (
                          <div className="placeholder_preupload">
                            <ImageField
                              record={{
                                url_default_permanent:
                                  "https://i.imgur.com/eyzFDuH.png",
                              }}
                              source="url_default_permanent"
                              {...rest}
                            />
                          </div>
                        );
                      }
                    }}
                  </FormDataConsumer>
                </>
              )
            }
          </FormDataConsumer>
        </Grid>
        <Grid item xs={8}>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.isPermanentAd && (
                <>
                  <ImageInput
                    source="imagePermanent"
                    label="Banner / Logo"
                    placeholder="Učitajte sliku u omjeru 1:5 (pravougaonik)"
                    className="banner_photo"
                    accept="image/*"
                    multiline={false}
                    {...rest}
                  >
                    <ImageField fullWidth source="src" title="title" />
                  </ImageInput>
                  <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => {
                      if (!formData.imagePermanent) {
                        return (
                          <div className="placeholder_preupload">
                            <ImageField
                              record={{
                                url_default_permanent:
                                  "https://i.imgur.com/qNYfSL2.png",
                              }}
                              source="url_default_permanent"
                              {...rest}
                            />
                          </div>
                        );
                      }
                    }}
                  </FormDataConsumer>
                </>
              )
            }
          </FormDataConsumer>
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const AdvertismentsCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Oglas uspješno kreiran!`);
    redirect(`/advertisments`);
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput
              source="name"
              label="Naziv"
              validate={[required()]}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              source="reddirectUrl"
              label="URL"
              validate={[required()]}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DateInput source="endDate" label="Datum okončanja" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput label="Povremena reklama" source="isQuestionAd" />
          </Grid>
          <Grid item xs={2}>
            <BooleanInput label="Stalna reklama" source="isPermanentAd" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.isQuestionAd && (
                  <>
                    <ImageInput
                      source="imageQuestion"
                      label="Logotip"
                      placeholder="Učitajte sliku u omjeru 1:1 (kvadrat)"
                      className="squared_photo"
                      accept="image/*"
                      mulitple={false}
                      multiline={false}
                      {...rest}
                    >
                      <ImageField fullWidth source="src" title="title" />
                    </ImageInput>
                    <FormDataConsumer>
                      {({ formData, dispatch, ...rest }) => {
                        if (!formData.imageQuestion) {
                          return (
                            <div className="placeholder_preupload">
                              <ImageField
                                record={{
                                  url_default_permanent:
                                    "https://i.imgur.com/eyzFDuH.png",
                                }}
                                source="url_default_permanent"
                                {...rest}
                              />
                            </div>
                          );
                        }
                      }}
                    </FormDataConsumer>
                  </>
                )
              }
            </FormDataConsumer>
          </Grid>
          <Grid item xs={8}>
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData.isPermanentAd && (
                  <>
                    <ImageInput
                      source="imagePermanent"
                      label="Banner / Logo"
                      placeholder="Učitajte sliku u omjeru 1:5 (pravougaonik)"
                      className="banner_photo"
                      accept="image/*"
                      multiline={false}
                      {...rest}
                    >
                      <ImageField fullWidth source="src" title="title" />
                    </ImageInput>
                    <FormDataConsumer>
                      {({ formData, dispatch, ...rest }) => {
                        if (!formData.imagePermanent) {
                          return (
                            <div className="placeholder_preupload">
                              <ImageField
                                record={{
                                  url_default_permanent:
                                    "https://i.imgur.com/qNYfSL2.png",
                                }}
                                source="url_default_permanent"
                                {...rest}
                              />
                            </div>
                          );
                        }
                      }}
                    </FormDataConsumer>
                  </>
                )
              }
            </FormDataConsumer>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
