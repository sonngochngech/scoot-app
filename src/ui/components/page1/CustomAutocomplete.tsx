import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

interface Option {
  name: string;
  [key: string]: any;
}

interface CustomAutocompleteProps {
  label: string;
  placeholder: string;
  value: Option | null;
  options: Option[];
  onChange: (event: React.SyntheticEvent, value: Option | null) => void;
  loadingIcon?: React.ReactNode;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
  loadingIcon,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Giới hạn tần suất tìm kiếm
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Tạo Web Worker cho tìm kiếm bất đồng bộ
    workerRef.current = new Worker(
      URL.createObjectURL(
        new Blob([`
          self.onmessage = function(e) {
            const { query, options } = e.data;
            const filtered = options.filter(option =>
              option.name.toLowerCase().includes(query.toLowerCase())
            );
            self.postMessage(filtered);
          };
        `], { type: "text/javascript" })
    ));

    workerRef.current.onmessage = (e) => {
      setFilteredOptions(e.data); // Cập nhật danh sách kết quả
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Hủy bỏ timeout cũ nếu có
    }

    setLoading(true);

    // Đặt lại timeout để gửi yêu cầu tìm kiếm sau một thời gian
    timeoutRef.current = setTimeout(() => {
      workerRef.current?.postMessage({ query: inputValue, options });
    }, 300); // Tìm kiếm sau 300ms kể từ lần gõ cuối cùng
  };

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      size="small"
      popupIcon={
        <img
          src="/page1/ic_down.svg"
          alt="icon"
          style={{ width: 18 }}
        />
      }
      options={filteredOptions}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required
          variant="standard"
          onChange={handleInputChange}
          sx={{ "& .MuiInputBase-root": { borderRadius: 2.5 } }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {loadingIcon || <LoadingDots />}
                  </Box>
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{
        "& .MuiAutocomplete-popupIndicator": {
          position: "relative",
          right: "12px",
          zIndex: 1,
        },
        "& .MuiAutocomplete-endAdornment": {
          display: "flex",
          alignItems: "center",
          gap: "16px",
        },
      }}
    />
  );
};

const LoadingDots: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: "6px",
            height: "6px",
            backgroundColor: "#000",
            borderRadius: "50%",
            animation: "dot-flash 1.5s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes dot-flash {
            0%, 80%, 100% {
              opacity: 0;
              transform: translateY(0);
            }
            40% {
              opacity: 1;
              transform: translateY(-8px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default CustomAutocomplete;
