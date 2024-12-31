declare module 'react-date-range' {
    import * as React from 'react';

    export interface Range {
        startDate: Date;
        endDate: Date;
        key: string;
    }

    export interface DateRangePickerProps {
        ranges: Range[];
        onChange: (ranges: { [key: string]: Range }) => void;
        showSelectionPreview?: boolean;
        moveRangeOnFirstSelection?: boolean;
        months?: number;
        direction?: 'vertical' | 'horizontal';
    }

    export class DateRangePicker extends React.Component<DateRangePickerProps> {}
}
