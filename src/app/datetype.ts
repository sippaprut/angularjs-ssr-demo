import * as moment from 'moment';
export interface DateType  {
    name: string,
    label?: string,
    hasDateFrom: boolean,
    hasDateTo: boolean,
    start?: any ,
    end?: any
}

export const dateType: DateType[] = [
    {
        name: 'Today',
        hasDateFrom: false,
        hasDateTo: false,
        start: moment().format('YYYY-MM-DD'),
        end: ''
    } ,
    {
        name: 'All time',
        hasDateFrom: false,
        hasDateTo: false,
        start: '',
        end: moment().format('YYYY-MM-DD')
    },
    {
        name: 'Past week',
        hasDateFrom: false,
        hasDateTo: false ,
        start: moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    },
    {
        name: 'Specific date',
        hasDateFrom: true,
        hasDateTo: false,
        start: '',
        end:''
    },
    {
        name: 'Past month',
        hasDateFrom: false,
        hasDateTo: false,
        start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    },
    {
        name: 'Date range',
        hasDateFrom: true,
        hasDateTo: true,
        start: '',
        end: moment().format('YYYY-MM-DD')
    },
    {
        name: 'Past Year',
        hasDateFrom: false,
        hasDateTo: false,
        start: moment().subtract(12, 'month').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
    }
];

