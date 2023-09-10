<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'family_required' => $requiredMessage('نام خانوادگی'),
    'family_min' => $minStringMessage('نام خانوادگی', 2),
    'family_max' => $maxStringMessage('نام خانوادگی', 50),
    'national_no_required' => $requiredMessage('شماره ملی'),
    'national_no_digits' => $digitsMessage('شماره ملی'),
    'national_no_unique' => 'این شماره ملی قبلا ثبت شده است.',
    'identity_no_required' => $requiredMessage('شماره شناسنامه'),
    'identity_no_numeric' => $numericMessage('شماره شناسنامه'),
    'identity_no_gte' => $gteNumericMessage('شماره شناسنامه', 0),
    'identity_no_lt' => $ltNumericMessage('شماره شناسنامه', 1000000),
    'birth_date_required' => $requiredMessage('تاریخ تولد'),
    'birth_date_numeric' => $numericMessage('تاریخ تولد'),
    'birth_date_gte' => $gteNumericMessage('تاریخ تولد', 13000101),
    'description_max' => $maxStringMessage('توضیحات', 300),
];
