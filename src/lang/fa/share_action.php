<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'action_type_undefined' => 'نامشخص',
    'action_type_1' => 'خرید',
    'action_type_2' => 'فروش',
    'action_date_required' => $requiredMessage('تاریخ تراکنش'),
    'action_date_numeric' => $numericMessage('تاریخ تراکنش'),
    'action_date_gte' => $gteNumericMessage('تاریخ تراکنش', 13000101),
    'action_type_required' => $requiredMessage('نوع تراکنش'),
    'action_type_numeric' => $numericMessage('نوع تراکنش'),
    'action_type_gte' => $gteNumericMessage('نوع تراکنش', 1),
    'action_type_lte' => $lteNumericMessage('نوع تراکنش', 2),
    'count_required' => $requiredMessage('تعداد'),
    'count_numeric' => $numericMessage('تعداد'),
    'count_gt' => $gtNumericMessage('تعداد', 0),
    'description_max' => $maxStringMessage('توضیحات', 300),
    'share_sell_exceeded' => 'تعداد سهام برای فروش، بیش‌تر از موجودی سهام است.',
];
