import React, { useState, useEffect, useRef, useMemo } from "react";
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

const createSearchWorker = () =>
  new Worker(
    URL.createObjectURL(
      new Blob(
        [
          `
          self.onmessage = function(e) {
            const { query, options } = e.data;
            const filtered = options.filter(option =>
              option.name.toLowerCase().includes(query.toLowerCase())
            );
            self.postMessage(filtered);
          };
        `,
        ],
        { type: "text/javascript" }
      )
    )
  );

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
}) => {
  const [visibleOptions, setVisibleOptions] = useState<Option[]>(options.slice(0, 50)); 
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string>("");

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = createSearchWorker();
    workerRef.current.onmessage = (e) => {
      setVisibleOptions(e.data.slice(0, 50));
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const debounceSearch = useMemo(() => {
    let timeout: NodeJS.Timeout | null = null;

    return (searchQuery: string) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (searchQuery.trim() === "") {
          setVisibleOptions(options.slice(0, 50));
          setLoading(false);
        } else {
          setLoading(true);
          workerRef.current?.postMessage({ query: searchQuery, options });
        }
      }, 300);
    };
  }, [options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    debounceSearch(inputValue);
  };

  const handleScroll = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget;

    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight - 10
    ) {
      if (!loading && visibleOptions.length < options.length) {
        setLoading(true);
        setTimeout(() => {
          setVisibleOptions((prev) => [
            ...prev,
            ...options.slice(prev.length, prev.length + 50),
          ]);
          setLoading(false);
        }, 300);
      }
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      size="small"
      popupIcon={
        <img src="/page1/ic_down.svg" alt="icon" style={{ width: 18 }} />
      }
      options={visibleOptions}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required
          variant="standard"
          value={query}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputBase-root": { borderRadius: 2.5 },
            "& .MuiInputLabel-root": {
              marginBottom: "24px",
            },
          }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <LoadingSpinner /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      ListboxProps={{
        onScroll: handleScroll,
      }}
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

const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      width: "20px",
      height: "20px",
      border: "3px solid rgba(0, 0, 0, 0.3)",
      borderTop: "3px solid #000",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }}
  >
    <style>
      {`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </Box>
);

export default CustomAutocomplete;