<?php
/** @file module.php
 * A brief file description.
 * A more elaborated file description.
 */

/** \addtogroup Core 
 *  @{
 */

/**
 * \defgroup Module
 * @{
 */


/**
 * Boot up procedure
 */
function bhavana_bootMeUp(){
	// Just booting up
}

/**
 * Init function
 */
function bhavana_init(){

	$paths = array(
		array(
			'r' => 'causes_get_max_time',
			'action' => 'bhavana_causesGetMaxTime',
			'access' => 'users_openAccess',
			'params' => array()
		),
		array(
			'r' => 'causes_add_to',
			'action' => 'bhavana_causesAddTo',
			'access' => 'users_openAccess',
			'params' => array()
		),
		array(
			'r' => 'bhavana_meditations_get_my_times',
			'action' => 'bhavana_meditationsGetMyTimes',
			'access' => 'users_openAccess',
			'params' => array()
		),
		array(
			'r' => 'bhavana_meditations_get_group_meditations',
			'action' => 'bhavana_meditationsGetGroupMeditations',
			'access' => 'users_openAccess',
			'params' => array()
		)
	);

	return $paths;
}

# Cause with maximum meditation
function bhavana_causesGetMaxTime(){

	$q = "SELECT idCause, name, totalTime FROM causes ORDER BY totalTime DESC LIMIT 1";

	$maxCause = db_query($q, 1);

	return $maxCause;

}

// Borrowed from lestatz
function geo_getMeVisitorDetails($ipAddress = ""){

	// Tmp solution
	$details = array();
	$details['latitude'] = rand(-70.0000, 80.0000);
	$details['longitude'] = rand(-70.0000, 80.0000);

	return $details;
}

/**
 * Add times to meditations
 */
function bhavana_causesAddTo(){

	global $user;

	// Load geolocator
	modules_loader('geoloc');

	$idCause = 0;

	# Get the correct id of the cause
	$q = sprintf("SELECT idCause FROM causes WHERE code = '%s'", params_get('causeCode', 1));

	$cause = db_query($q, 1);

	# Where is this person?
	$location = _geoloc_getMeVisitorDetails();

	if($cause->idCause > 0){
		// Register the new time
		$q = sprintf("INSERT INTO `meditations` (`timestamp`, `totalTime`, `idCause`, `idUser`, `coordinates`)
			VALUES ('%s', '%s', '%s', '%s', '%s')",
				time(),
				params_get('totalTime', 10),
				$cause->idCause,
				$user->idUser,
				$location['longitude'] . "," . $location['latitude']
			);

		$r = db_query($q, 0);

		# Update total times
		$q = sprintf("UPDATE causes SET totalTime = totalTime + %s WHERE idCause = '%s'", params_get('totalTime',10), $cause->idCause);
		$r = db_query($q, 0);
	}

	// I will just say it worked, not much to do if it did not.
	return SUCCESS_ALL_GOOD;

}

/**
 * Retrieves the meditation times, per day, for this person
 */
function bhavana_meditationsGetMyTimes(){

	global $user;

	$q = sprintf("
		SELECT FROM_UNIXTIME(timestamp, '%%Y.%%e.%%m') AS day, SUM(totalTime) AS totalTime
		FROM meditations
		WHERE idUser = '%s'
		AND timestamp > %s
		GROUP BY day
		ORDER BY day
		", $user->idUser, (time()-(params_get('goBack', 7)*86400)));

	$res = db_query($q, 2);
	$labels = array();
	$times = array();
	if($res > 0){
		foreach($res as $r){
			$labels[] = $r->day;
			$times[] = $r->totalTime;
		}
	}
	return array("labels" => $labels, "times" => $times);

}

/**
 * Get group meditations times per day
 */
function bhavana_meditationsGetGroupMeditations(){

	grace_debug("Getting meditation times per day");

	$q = sprintf("
		SELECT FROM_UNIXTIME(m.timestamp, '%%Y.%%e.%%m') AS day, SUM(m.totalTime) AS totalTime, m.idCause, c.name AS cName, c.code AS cCode
		FROM meditations m
		INNER JOIN causes c ON c.idCause = m.idCause
		WHERE timestamp > 90
		GROUP BY idCause, day
		ORDER BY day
		", (time()-(params_get('ini', 0)*86400)));

	$r = db_query($q, 2);

	$stuff = array();
	$details = array();
	$dates  = array();

	foreach($r as $row){
		$stuff[$row->cCode][] = array("name" => $row->cName, "day" => $row->day, "totalTime" => $row->totalTime);
		$details[$row->cName]['details'][$row->day] = $row->totalTime;
		$dates[] = $row->day;
	}

	# Remove duplicates
	$dates = array_unique($dates);

	# Lets fix the dates (remove keys)
	$nDates = array();
	foreach($dates as $d){
		$nDates[] = $d;
	}

	# Fix dates to see if there are any missing ones?
	foreach($details as $topic => $d){
		foreach($dates as $date){
			if(!array_key_exists($date, $details[$topic]['details'])){
				$details[$topic]['details'][$date] = 0;
				# Sort them out
			}
		}
				ksort($details[$topic]['details']);
	}

	# Now, lets get rid of all that is not needed
	$justTheNumbers = array();
	foreach($details as $topic => $d){
		foreach($dates as $date){
			$justTheNumbers[$topic][] = $details[$topic]['details'][$date];
		}
	}

	return array('details' => $justTheNumbers, 'dates' => $nDates);

}

/**@}*/
/** @}*/
