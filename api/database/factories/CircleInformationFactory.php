<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Enum\CircleType;
use App\Enum\CircleModel;
use App\Enum\CircleInformationModel;
use App\Enum\PlaceOfActivity;
use App\Models\Circle;
use App\Models\CircleInformation;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(CircleInformation::class, function (Faker $faker) {
    return [
        CircleInformationModel::name_kana   => 'うらぼ',
        CircleInformationModel::short_name  => 'U-lab',
        CircleInformationModel::prefix_name => '地域に根差す学生集団',
        CircleInformationModel::circle_type => CircleType::STUDENT_GROUP,
        CircleInformationModel::description => '宇都宮大学学生団体。地域に根差すテクノロジー集団。',
        CircleInformationModel::appealing_point1                  => '工学を使った地域おこし',
        CircleInformationModel::appealing_point2                  => 'webサイトやメディアアート製作',
        CircleInformationModel::appealing_point3                  => '大学一自由',
        CircleInformationModel::common_place_of_activity          => PlaceOfActivity::MINE,
        CircleInformationModel::common_place_of_activity_detail   => '4号館',
        CircleInformationModel::common_date_of_activity_monday    => null,
        CircleInformationModel::common_date_of_activity_tuesday   => null,
        CircleInformationModel::common_date_of_activity_wednesday => true,
        CircleInformationModel::common_date_of_activity_thursday  => null,
        CircleInformationModel::common_date_of_activity_friday    => null,
        CircleInformationModel::common_date_of_activity_saturday  => true,
        CircleInformationModel::common_date_of_activity_sunday    => false,
        CircleInformationModel::common_date_of_activity_detail    => '日曜日はイベントを開きます',
        CircleInformationModel::is_online_activity                => true,
        CircleInformationModel::online_place_of_activity_detail   => 'discordでやってます。',
        CircleInformationModel::online_date_of_activity_monday    => null,
        CircleInformationModel::online_date_of_activity_tuesday   => null,
        CircleInformationModel::online_date_of_activity_wednesday => true,
        CircleInformationModel::online_date_of_activity_thursday  => null,
        CircleInformationModel::online_date_of_activity_friday    => null,
        CircleInformationModel::online_date_of_activity_saturday  => true,
        CircleInformationModel::online_date_of_activity_sunday    => false,
        CircleInformationModel::online_date_of_activity_detail    => '日曜日はイベントを開きます',
        CircleInformationModel::admission_fee_per_year              => 3000,
        CircleInformationModel::number_of_members          => 10,
        CircleInformationModel::public_email               => 'example@example.com',
        CircleInformationModel::twitter_url                => 'https://twitter.com',
        CircleInformationModel::instagram_url              => 'https://instagram.com',
        CircleInformationModel::github_url                 => 'https://github.com/u-lab',
    ];
});

$factory->state(CircleInformation::class, '非公開', function (Faker $faker) {
    return [
        CircleModel::slug    => $faker->slug,
        CircleModel::release => false,
    ];
});
