/ react-hook-form + mui
const ControlledField = ({
  label,
  value,
  control,
  name,
  fieldType,
  fieldRules,
  isMultiline,
  isDisabled = null,
  error,
}) => {
  return (
    <>
      <Controller
        render={({ field }) => (
          <TextField
            disabled={isDisabled}
            fullWidth
            multiline={isMultiline}
            variant='outlined'
            label={label}
            value={value}
            type={fieldType}
            {...field}
          />
        )}
        control={control}
        name={name}
        defaultValue={value}
        rules={fieldRules}
      />
      {error && (
        <Typography
          style={{ paddingLeft: '2rem' }}
          align='left'
          variant='body2'
          color='error'
        >
          {error.message}
        </Typography>
      )}
    </>
  );
};