
var myHeaders = new Headers();
myHeaders.append("content-Type", "application/json");
myHeaders.append("signature", "a9aac42d4f18830d4af10850eac6f3f07875870d");
myHeaders.append("token", "a7fa0d0e04ac3f565347ec11a81d07c3a7effaf2581cc60119f094114d0a2c56");
myHeaders.append("signature-salt", "c219f71f4d4639465cabfa6d54e07bd2");
myHeaders.append("algorithm", "MEMO_AES_V3");
myHeaders.append("Content-Length", 2587);
myHeaders.append("Host", "www.maimemo.com");
myHeaders.append("user-agent", "UserTag/d0e5f397b9101abc4c8eee7a21593e64 Maimemo/5.5.45_7986 iOS/26.2 Device/iPhone15,2 (ARM_64) Resolution/960x2079 RAM/5.53 ROM/111.38 DId/10f5223bb656bc1145e73d4c9251f699 InstallId/ebe78f4617c74415bf529dfe9a36c546 DeviceName/iPhone Jbv/NIL AFNetworking/4.0.1 Timezone/Asia%2FShanghai+08:00 Theme/Night");
myHeaders.append("Cache-Control", "no-cache");


var raw = JSON.stringify({
  "lsr_count": 104,
  "last_sign_time": "2026-01-02T05:09:05.020+08:00",
  "is_auto_sign": false,
  "study_time": 40,
  "study_log": {
    "sound_repeat_value": 1,
    "today_all_familiar_count": 10,
    "today_study_new_count": 0,
    "net_type": "WIFI",
    "algorithm_version": "05",
    "revision_remind_open": 1,
    "today_review_study_duration": 0,
    "today_review_vague_count": 0,
    "study_start_time": "2026-01-02T01:07:33.000+08:00",
    "study_gesture_state": 0,
    "book_id": "4247961",
    "total_learned_voc_count": 934,
    "today_all_study_count": 10,
    "today_study_review_count": 10,
    "today_new_study_duration": 0,
    "today_new_unfamiliar_count": 0,
    "select_method": 3,
    "today_new_well_familiar_count": 0,
    "total_left_voc_count": 128,
    "study_method": 2,
    "phrase_speech_enabled": 0,
    "today_new_uncertain_count": 0,
    "today_new_familiar_count": 0,
    "book_type": null,
    "total_history_voc_count": 0,
    "today_review_well_familiar_count": 0,
    "today_review_familiar_count": 10,
    "today_all_vague_count": 0,
    "matrix_version": "1000025",
    "today_voc_limit": 10,
    "today_review_forget_count": 0,
    "total_voc_custom_count": 1062,
    "revision_remind_time": "2015-01-01T16:00:00.000+08:00",
    "today_all_study_duration": 45000,
    "today_all_forget_count": 0,
    "is_wifi": 1,
    "today_plan_voc_count": 104,
    "today_all_well_familiar_count": 0
  },
  "study_brief_logs": [
    {
      "time": "2026-01-02T01:07:33.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067ba7a172044907c61a50",
      "duration": 7673
    },
    {
      "time": "2026-01-02T01:07:36.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b69a172044907c6036b",
      "duration": 2627
    },
    {
      "time": "2026-01-02T01:07:40.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b9da172044907c61705",
      "duration": 4625
    },
    {
      "time": "2026-01-02T01:07:43.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b8da172044907c60f89",
      "duration": 2744
    },
    {
      "time": "2026-01-02T01:07:48.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067ba2a172044907c61885",
      "duration": 4539
    },
    {
      "time": "2026-01-02T01:07:52.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b9ba172044907c61555",
      "duration": 3595
    },
    {
      "time": "2026-01-02T01:07:55.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b6da172044907c60408",
      "duration": 3311
    },
    {
      "time": "2026-01-02T01:08:01.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b7da172044907c609be",
      "duration": 5232
    },
    {
      "time": "2026-01-02T01:08:04.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b8ca172044907c60d98",
      "duration": 3017
    },
    {
      "time": "2026-01-02T01:08:10.000+08:00",
      "count": 1,
      "response": "FAMILIAR",
      "voc_id": "57067b73a172044907c60744",
      "duration": 5241
    }
  ],
  "debt_report_data": {
    "max_voc_count": 1062,
    "time": "2026-01-02T05:17:56.012+08:00",
    "day_new_limit": 0,
    "learned_voc_count": 934
  },
  "new": 0
});


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw
};

fetch("https://www.maimemo.com/api/v1/sign/sign", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));