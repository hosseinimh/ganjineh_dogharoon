<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'action_type_undefined' => 'نامشخص',
    'action_type_1' => 'خرید',
    'action_type_2' => 'فروش',
    'action_type_3' => 'استرداد',
    'action_date_required' => $requiredMessage('تاریخ درخواست'),
    'action_date_numeric' => $numericMessage('تاریخ درخواست'),
    'action_date_gte' => $gteNumericMessage('تاریخ درخواست', 13000101),
    'action_type_required' => $requiredMessage('نوع درخواست'),
    'action_type_numeric' => $numericMessage('نوع درخواست'),
    'action_type_gte' => $gteNumericMessage('نوع درخواست', 1),
    'action_type_lte' => $lteNumericMessage('نوع درخواست', 3),
    'transaction_date_required' => $requiredMessage('تاریخ تراکنش'),
    'transaction_date_numeric' => $numericMessage('تاریخ تراکنش'),
    'transaction_date_gte' => $gteNumericMessage('تاریخ تراکنش', 13000101),
    'invoice_no_max' => $maxStringMessage('حواله بانکی', 50),
    'price_required' => $requiredMessage('مبلغ'),
    'price_numeric' => $numericMessage('مبلغ'),
    'price_gte' => $gteNumericMessage('مبلغ', 0),
    'price_lte' => $lteNumericMessage('مبلغ', 100000000),
    'description_max' => $maxStringMessage('توضیحات', 300),
    'share_exceeded' => 'سهام‌دار دارای سهام است.',
    'share_already_assigned' => 'سهام‌دار، دارای سهام است و امکان خرید سهام بیشتر را ندارد.',
    'share_exceeded' => 'سهام‌دار، سهامی برای عرضه ندارد.',
    'share_not_last' => 'ثبت تراکنش سهام، تنها پس از تاریخ :field امکان‌پذیر است.',
];
