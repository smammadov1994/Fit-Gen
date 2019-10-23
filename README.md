# Workout-Enhancer

![workout logo](https://media.git.generalassemb.ly/user/22420/files/b1906400-f4ec-11e9-8c35-8c16b5d10498)
This application allows the user to generate a choice-specific workout regime.

Built with: HTML, CSS, Javascript, JQUERY.

Facts:
RepEnhancer pulls from a database of over 300+ workouts to ensure that every workout is uniquely generated.

Approach:
I wanted to build an app that will motivate people to continue to train and push their limits. I hosted this site and will allow individuals from my gym, LA Fitness of Norwalk, and everyone else that is interested to utilize it as a tool to enhance their workout regime and empower them to continue staying fit. 

Hurdles:
There were a few bugs that became evident when trying to optimize the functionality of the app. To start, there were a lot of messy code when it came to CSS. When trying for responsiveness, I was running into issues with total responsiveness on all browsers because I did not use the appropriate -webkit- tools. Initially, it was fully responsive on chrome but not safari or mozzila. Since people will mostly be accesing this application on the iphone, I switched it so that the most responsiveness was from safari. Chrome and mozilla are a little messy. Second, I had some logic issues with the javascript. However, I was able to figure this out after pseudo-coding the process. Overall, I am happy with the design and the speed of "fetch" from API. I hope people will utilize this application. I will continue to update RepEnhancer in the weeks to come. 

Building the API:
```python
#export
import pandas as pd
import os
import json
```


```python
#export
import random
```


```python
path = './data/new_exercises.csv'
```


```python
wnew_df = pd.read_csv(path)
```


```python
wnew_df.head(3)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Muscle Group</th>
      <th>Exercise</th>
      <th>Sets</th>
      <th>Reps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Abdominals</td>
      <td>Full Reverse Crunch</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Abdominals</td>
      <td>Incline Hip Thrust</td>
      <td>2</td>
      <td>14</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Abdominals</td>
      <td>Incline Reverse Crunch</td>
      <td>6</td>
      <td>14</td>
    </tr>
  </tbody>
</table>
</div>




```python
rename = {
    'Muscle Group': 'workout_name',
    'Exercise': 'exercise_name',
    'Sets': 'sets',
    'Reps': 'reps'
}
wnew_df.rename(columns=rename, inplace=True)
```


```python
wnew_df['workout_name'].value_counts()
```




    Legs           53
    Biceps         38
    Triceps        38
    Chest          37
    Abdominals     36
    Back           27
    Shoulders      26
    Calves         10
    Name: workout_name, dtype: int64



# Re-Scripting 
we will now take the old script and rescript for our new workout db


```python
#export
workouts = {
    'legs': 'Legs|Calves',
    'shoulders': 'Shoulders',
    'arms': 'Biceps|Triceps',
    'chest': 'Chest',
    'back': 'Back',
    'core': 'Abdominals'
}
```


```python
#export
def get_workout_name(workout, workouts=workouts):
    return workouts[workout]
```


```python
get_workout_name('back')
```




    'Back'




```python
#export
from sklearn.utils import shuffle
```


```python
#export
def grab_random_workouts(workout, df=wnew_df, workouts=workouts):
    """
    will take workout name and return a new df with those workouts split into groups
    """
    
    wo = get_workout_name(workout, workouts)
    workouts_pre = df[df['workout_name'].str.contains(wo)].copy()
        
    r = random.randint(4,6)
    
    s_workouts = shuffle(workouts_pre)
    
    return s_workouts.iloc[:r]
```


```python
grab_random_workouts('back')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>workout_name</th>
      <th>exercise_name</th>
      <th>sets</th>
      <th>reps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>53</th>
      <td>Back</td>
      <td>One Arm Dumbbell Row</td>
      <td>4</td>
      <td>10</td>
    </tr>
    <tr>
      <th>39</th>
      <td>Back</td>
      <td>Lat Pulldown</td>
      <td>4</td>
      <td>14</td>
    </tr>
    <tr>
      <th>40</th>
      <td>Back</td>
      <td>Pull-Up</td>
      <td>3</td>
      <td>12</td>
    </tr>
    <tr>
      <th>62</th>
      <td>Back</td>
      <td>Standing Single-Arm Cable Row</td>
      <td>2</td>
      <td>16</td>
    </tr>
    <tr>
      <th>57</th>
      <td>Back</td>
      <td>Seated Row</td>
      <td>5</td>
      <td>12</td>
    </tr>
    <tr>
      <th>56</th>
      <td>Back</td>
      <td>Seated Cable Row</td>
      <td>3</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>




```python
#export
def to_dict(random_workouts):
    workout_list = {
        'workouts': list()
    }
    
    l = len(random_workouts)
    for i in range(l):
        output = {
            'exercise': random_workouts.iloc[i]['exercise_name'],
            'sets': int(random_workouts.iloc[i]['sets']),
            'reps': int(random_workouts.iloc[i]['reps'])
        }
        workout_list['workouts'].append(output)
        
    return workout_list
```


```python
# Full call would be:
workout = 'back'
json.dumps(to_dict(grab_random_workouts(workout)))
```




    '{"workouts": [{"exercise": "Standing Cable Row", "sets": 6, "reps": 4}, {"exercise": "Bent-Over Dumbbell Row", "sets": 5, "reps": 4}, {"exercise": "Bent-Over Single-Arm Long Barbell Row", "sets": 6, "reps": 4}, {"exercise": "One Arm Dumbbell Row", "sets": 4, "reps": 10}]}'




```python
%time json.dumps(to_dict(grab_random_workouts(workout)))
```

    Wall time: 3.99 ms
    




    '{"workouts": [{"exercise": "Single-Arm Lat Pulldown", "sets": 6, "reps": 6}, {"exercise": "Bent-Over Barbell Row", "sets": 3, "reps": 6}, {"exercise": "Bent-Over Dumbbell Row", "sets": 5, "reps": 4}, {"exercise": "Bent-Over Long Barbell Row", "sets": 2, "reps": 8}, {"exercise": "One Arm Dumbbell Row", "sets": 4, "reps": 10}, {"exercise": "Bent-Over Hammer Dumbbell Row", "sets": 3, "reps": 8}]}'




```python

```


```python
!python notebook2script.py workoutAPIb_01.ipynb
```

    Converted workoutAPIb_01.ipynb to exp\nb_workoutAPIb.py
    
