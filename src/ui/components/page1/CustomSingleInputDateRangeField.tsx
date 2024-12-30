import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

const CustomSingleInputDateRangeField = (props: any) => {
  return (
    <SingleInputDateRangeField
      format="DD/MM/YYYY"
      {...props}
      slotProps={{
        textField: {
          required: true,
          placeholder: "dd/mm/yyyy - dd/mm/yyyy",
          variant: "standard",
          InputLabelProps: {
            shrink: true,
          },
          InputProps: {
            sx: {
              borderRadius: 2.5,
              height: "100%",
              "& .MuiSvgIcon-root": { display: 'none' },
            },
          },
          sx: {
            height: "100%",
            width: "100%",
            placeholder: "dd/mm/yyyy",
            overflow: "hidden",
          },
          fullWidth: true,
          label: "Date Range",
        },
      }}
    />
  );
};

export default CustomSingleInputDateRangeField;
