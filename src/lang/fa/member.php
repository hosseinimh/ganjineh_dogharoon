<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'family_required' => $requiredMessage('نام خانوادگی'),
    'family_min' => $minStringMessage('نام خانوادگی', 2),
    'family_max' => $maxStringMessage('نام خانوادگی', 50),
    'national_no_required' => $requiredMessage('شماره ملی'),
    'national_no_digits' => $digitsMessage('شماره ملی'),
    'national_no_max_digits' => $maxDigitsMessage('شماره ملی', 10),
    'national_no_unique' => 'این شماره ملی قبلا ثبت شده است.',
    'identity_no_required' => $requiredMessage('شماره شناسنامه'),
    'identity_no_numeric' => $numericMessage('شماره شناسنامه'),
    'identity_no_gte' => $gteNumericMessage('شماره شناسنامه', 0),
    'identity_no_lt' => $ltNumericMessage('شماره شناسنامه', 1000000),
    'father_name_required' => $requiredMessage('نام پدر'),
    'father_name_min' => $minStringMessage('نام پدر', 2),
    'father_name_max' => $maxStringMessage('نام پدر', 50),
    'birth_date_required' => $requiredMessage('تاریخ تولد'),
    'birth_date_numeric' => $numericMessage('تاریخ تولد'),
    'birth_date_gte' => 'مقدار فیلد تاریخ تولد باید برابر یا بزرگ‌تر از 1300/01/01 باشد.',
    'membership_date_required' => $requiredMessage('تاریخ عضویت'),
    'membership_date_numeric' => $numericMessage('تاریخ عضویت'),
    'membership_date_gte' => 'مقدار فیلد تاریخ عضویت باید برابر یا بزرگ‌تر از 1380/01/01 باشد.',
    'postal_code_max_digits' => $maxDigitsMessage('کد پستی', 10),
    'village_id_numeric' => $numericMessage('روستا'),
    'village_id_gte' => $gteNumericMessage('روستا', 0),
    'tel_max' => $maxStringMessage('شماره تلفن', 50),
    'mobile_max' => $maxStringMessage('شماره همراه', 50),
    'address_max' => $maxStringMessage('آدرس', 300),
    'description_max' => $maxStringMessage('توضیحات', 300),
    'card_no_required' => $requiredMessage('شماره کارت'),
    'card_no_numeric' => $numericMessage('شماره کارت'),
    'card_no_gt' => $gtNumericMessage('شماره کارت', 0),
    'card_no_gte' => $gteNumericMessage('شماره کارت', 0),
    'card_no_max_digits' => $maxDigitsMessage('شماره کارت', 6),
    'card_no_unique' => 'این شماره کارت قبلا ثبت شده است.',
    'all_members_count' => 'تعداد سرپرست خانوار',
    'all_member_relations_count' => 'تعداد افراد تحت تکفل',
    'all_count' => 'تعداد کل افراد',
    'card_no' => 'شماره کارت',
    'name_family' => 'نام و نام خانوادگی',
    'father_name' => 'نام پدر',
    'birth_date' => 'تاریخ تولد',
    'national_no' => 'ش ملی',
    'identity_no' => 'ش ش',
    'mobile' => 'موبایل',
    'member_relations_count' => 'افراد تحت تکفل',
    'village' => 'روستا',
];
